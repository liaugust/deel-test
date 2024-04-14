import { Contract } from '../entity/contract.entity.js';

export class ContractRepository {
	constructor() {
		this.repository = Contract
	}

	async getById(id) {
		return await this.repository.findByPk(id)
	}
}