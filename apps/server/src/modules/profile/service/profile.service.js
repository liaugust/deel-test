import { ProfileRepository } from '../repository/profile.repository.js';

export class ProfileService {
	constructor() {
		this.repository = new ProfileRepository()
	}

	async getAll() {
		return await this.repository.getAll()
	}

	async getClients() {
		return await this.repository.getClients()
	}

	async getContractors() {
		return await this.repository.getContractors()
	}

	async incrementBalance(profileId, amount, transaction) {
		await this.repository.incrementBalance(profileId, amount, transaction)
	}

	async decrementBalance(profileId, amount, transaction) {
		await this.repository.decrementBalance(profileId, amount, transaction)
	}

	async getByIds(ids) {
		return await this.repository.getByIds(ids)
	}

	async getById(id) {
		return await this.repository.getById(id)
	}
}