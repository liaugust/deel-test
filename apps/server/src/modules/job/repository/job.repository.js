import { Job } from '../entity/job.entity.js';
import { Contract } from '../../contract/entity/contract.entity.js';

export class JobRepository {
	constructor() {
		this.repository = Job
	}

	async getById(id) {
		return await this.repository.findByPk(id, {
			include: [Contract],
		})
	}

	async markAsPaid(jobId, transaction) {
		return await this.repository.update({ paid: true, paymentDate: new Date() }, { where: { id: jobId }, transaction });
	}
}
