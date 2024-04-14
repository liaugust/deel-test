import { HTTP_STATUS } from '../../../utils/constants.js';
import { ProfileService } from '../service/profile.service.js';

export class ProfileController {
	constructor() {
		this.service = new ProfileService();
	}

	async getProfiles(req, res) {
		const { type } = req.query;

		try {
			if (type === 'client') {
				const profiles = await this.service.getClients()

				return res.json(profiles);
			}

			if (type === 'contractor') {
				const profiles = await this.service.getContractors()

				return res.json(profiles);
			}

			const profiles = await this.service.getAll();

			res.json(profiles);
		} catch (e) {
			const error = e instanceof Error ? e.message : 'Unknown error';

			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error })
		}
	}

	async getProfile(req, res) {
		res.json(req.profile);
	}

	async deposit(req, res) {
		try {

			const { amount } = req.body;
			const { profile } = req;

			if (profile.type !== 'client') {
				return res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Only clients can deposit money' });
			}

			// FIXME needs clarification.
			// The requirement says "a client can't deposit more than 25% his total of jobs to pay".
			//
			// const activeContracts = await Contract.findAll({
			//  where: {
			// 	 status: 'in_progress',
			// 	 ClientId: profile.id,
			//  },
			//  include: [
			// 	 {
			// 		 model: Job,
			// 		 as: 'Jobs',
			// 		 where: {
			// 		  paid: null,
			// 		 },
			// 	 },
			//  ],
			// });
			//
			// const jobs = activeContracts.flatMap((contract) => contract.Jobs);
			//
			// const total = jobs.reduce((acc, job) => acc + job.price, 0);
			// const quarterOfTotal = total / 4;
			// if (amount > quarterOfTotal) {
			//    console.log("amount > quarterOfTotal");
			//    return res.status(HTTP_STATUS.BAD_REQUEST).json({
			//      error: "Deposit amount exceeds the quarter of the total job price",
			//    });
			// }

			await this.service.incrementBalance(profile.id, amount);

			res.status(HTTP_STATUS.OK).end();
		} catch (e) {
			const error = e instanceof Error ? e.message : 'Unknown error';

			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error })
		}
	}
}
