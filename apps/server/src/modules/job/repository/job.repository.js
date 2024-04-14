import { Job } from '../entity/job.entity.js';
import { Contract } from '../../contract/entity/contract.entity.js';
import Sequelize, { Op } from 'sequelize';
import { Profile } from '../../profile/entity/profile.entity.js';

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

	async getBestClientsForPeriod(startDate, endDate, limit) {
		return await this.repository.findAll({
			where: {
				paymentDate: {
					[Op.between]: [startDate, endDate],
				},
			},
			attributes: [
				[Sequelize.fn('SUM', Sequelize.col('price')), 'paid'],
			],
			include: [{
				model: Contract,
				attributes: ['id'],
				include: [{
					model: Profile,
					as: 'Client',
					attributes: ['id', 'firstName', 'lastName'],
					where: {
						type: 'client',  // Ensures we only consider clients
					},
				}],
			}],
			group: ['Contract.clientId'],
			order: [[Sequelize.col('paid'), 'DESC']],
			limit: limit,
		});

	}

	async getBestProfessionForPeriod(startDate, endDate) {
		const [job] = await this.repository.findAll({
			where: {
				paymentDate: {
					[Op.between]: [startDate, endDate],
				},
			},
			attributes: [
				'description',
				[Sequelize.fn('SUM', Sequelize.col('price')), 'totalEarned'],
			],
			include: [{
				model: Contract,
				attributes: [],
				include: [{
					model: Profile,
					as: 'Contractor',
					attributes: [],
					where: {
						type: 'contractor',
					},
				}],
			}],
			group: ['description'],
			order: [[Sequelize.col('totalEarned'), 'DESC']],
			limit: 1,
		});

		return job
	}
}
