import { Profile } from '../entity/profile.entity.js';
import { Op } from 'sequelize';

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

	async decrementBalance(profileId, amount, transaction) {
		await this.repository.decrement('balance', {
			by: amount,
			transaction,
			where: { id: profileId },
		});
	}

	async getByIds(ids) {
		return await this.repository.findAll({
			where: {
				id: {
					[Op.in]: ids,
				},
			},
		})
	}

	async getById(id) {
		return await this.repository.findByPk(id)
	}
}