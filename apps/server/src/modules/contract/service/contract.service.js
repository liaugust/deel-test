import { ContractRepository } from '../repository/contract.repository.js';

export class ContractService {
	constructor() {
		this.repository = new ContractRepository()
	}

	async getById(id) {
		return await this.repository.getById(id)
	}
}