import { ContractRepository } from '../repository/contract.repository.js';

export class ContractService {
	constructor() {
		this.repository = new ContractRepository()
	}

	async getById(id) {
		return await this.repository.getById(id)
	}

	async getByClientId(clientId) {
		return await this.repository.getByClientId(clientId)
	}

	async getUnpaidJobs(profileId, contractorId) {
		return await this.repository.getUnpaidJobs(profileId, contractorId)
	}
}