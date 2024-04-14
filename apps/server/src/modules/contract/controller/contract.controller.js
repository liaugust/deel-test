import { ContractService } from '../service/contract.service.js';
import { HTTP_STATUS } from '../../../utils/constants.js';

export class ContractController {
	constructor() {
		this.service = new ContractService();
	}

	async getById(req, res) {
		const { id } = req.params

		try {
			const contract = await this.service.getById(id)

			if (!contract) {
				return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Contract not found' })
			}

			res.json(contract)
		} catch (e) {
			const error = e instanceof Error ? e.message : 'Unknown error';

			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error })
		}
	}

	async getUnpaidJobs(req, res) {
		const { profile } = req;

		try {
			const activeContracts = await this.service.getUnpaidJobs(profile.id);

			const jobs = activeContracts.flatMap((contract) => contract.Jobs);

			res.json(jobs);
		} catch (e) {
			const error = e instanceof Error ? e.message : 'Unknown error';

			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
		}
	}
}