import express from 'express';
import bodyParser from 'body-parser';
import { HTTP_STATUS } from './utils/constants.js';
import { getProfile } from './middleware/getProfile.js';
import { sequelize } from './lib/db.js';
import './lib/relations.js'

export const app = express();

app.use(bodyParser.json());

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (req, res) => {
	const { Contract } = req.app.get('models')
	const { id } = req.params
	const contract = await Contract.findOne({ where: { id } })

	if (!contract) {
		return res.status(HTTP_STATUS.NOT_FOUND).end()
	}

	res.json(contract)
})

// Returns a list of profiles, useful for your login
app.get('/profiles', async (req, res) => {
	const { Profile } = req.app.get('models');
	const { type } = req.query;

	if (type === 'client') {
		const profiles = await Profile.findAll({
			where: {
				type: 'client',
			},
		});

		return res.json(profiles);
	}

	if (type === 'contractor') {
		const profiles = await Profile.findAll({
			where: {
				type: 'contractor',
			},
		});

		return res.json(profiles);
	}

	const profiles = await Profile.findAll();

	res.json(profiles);
});

app.get('/profile', getProfile, async (req, res) => {
	res.json(req.profile);
});