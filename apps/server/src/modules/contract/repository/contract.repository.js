import { Contract } from '../entity/contract.entity.js';
import { Job } from '../../job/entity/job.entity.js';

export class ContractRepository {
	constructor() {
		this.repository = Contract
	}

	async getById(id) {
		return await this.repository.findByPk(id)
	}

	async getByClientId(clientId) {
		return await this.repository.findAll({
			where: {
				ClientId: clientId,
			},
		});
	}

	async getUnpaidJobs(profileId) {
		return await this.repository.findAll({
			where: {
				ClientId: profileId,
				status: 'in_progress',
			},
			include: [
				{
					model: Job,
					as: 'Jobs',
					where: {
						paid: null,
					},
				},
			],
		});
	}
}