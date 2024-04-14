import { JobRepository } from '../repository/job.repository.js';

export class JobService {
	constructor() {
		this.repository = new JobRepository()
	}

	async getById(id) {
		return await this.repository.getById(id)
	}

	async markAsPaid(jobId, transaction) {
		await this.repository.markAsPaid(jobId, transaction)
	}
}