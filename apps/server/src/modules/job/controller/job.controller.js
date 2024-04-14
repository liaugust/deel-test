import { JobService } from '../service/job.service.js';
import { sequelize } from '../../../lib/db.js';
import { HTTP_STATUS } from '../../../utils/constants.js';
import { ProfileService } from '../../profile/service/profile.service.js';

export class JobController {
	constructor() {
		this.jobService = new JobService()
		this.profileService = new ProfileService()
	}

	async payForJob(req, res) {
		try {
			const { jobId } = req.params;
			const { profile } = req;

			await sequelize.transaction(async (transaction) => {
				const job = await this.jobService.getById(jobId);

				if (!job) {
					return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Job not found' });
				}

				if (job.Contract.status !== 'in_progress') {
					return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Contract not in progress' });
				}

				if (job.paid) {
					return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Job already paid' });
				}

				if (profile.id !== job.Contract.ClientId) {
					return res
						.status(HTTP_STATUS.FORBIDDEN)
						.json({ error: 'Only the client can pay for a job' });
				}

				const client = await this.profileService.getById(job.Contract.ClientId);

				if (!client) {
					return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Client not found' });
				}

				if (client.balance < job.price) {
					return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Insufficient balance' });
				}

				await this.profileService.decrementBalance(client.id, job.price, transaction);

				await this.profileService.incrementBalance(job.Contract.ContractorId, job.price, transaction);

				await this.jobService.markAsPaid(job.id, transaction)
			});

			res.status(HTTP_STATUS.OK).end();
		} catch (e) {
			const error = e instanceof Error ? e.message : 'Unknown error';

			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
		}
	}

	async getBestClientsForPeriod(req, res) {
		const { start, end, limit = 2 } = req.query
		const startDate = new Date(start)
		const endDate = new Date(end)

		try {
			const clients = await this.jobService.getBestClientsForPeriod(startDate, endDate, limit)

			const result = clients.map(item => {
				const { id, firstName, lastName } = item.Contract.Client

				return {
					id,
					paid: item.dataValues.paid,
					fullName: `${firstName} ${lastName}`,
				}
			});

			res.json(result)
		} catch (e) {
			const error = e instanceof Error ? e.message : 'Unknown error';

			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error })
		}
	}

	async getBestProfessionForPeriod(req, res) {
		const { start, end } = req.query
		const startDate = new Date(start)
		const endDate = new Date(end)

		try {
			const job = await this.jobService.getBestProfessionForPeriod(startDate, endDate)

			res.json(job)
		} catch (e) {
			const error = e instanceof Error ? e.message : 'Unknown error';

			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
		}
	}
}