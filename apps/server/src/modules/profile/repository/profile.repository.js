import { Profile } from '../entity/profile.entity.js';

export class ProfileRepository {
	constructor() {
		this.repository = Profile
	}

	async getAll() {
		return await this.repository.findAll()
	}

	async getClients() {
		return await this.repository.findAll({
			where: {
				type: 'client',
			},
		})
	}

	async getContractors() {
		return await this.repository.findAll({
			where: {
				type: 'contractor',
			},
		})
	}

	async incrementBalance(profileId, amount, transaction) {
		await this.repository.increment('balance', {
			by: amount,
			transaction,
			where: { id: profileId },
		});
	}
}