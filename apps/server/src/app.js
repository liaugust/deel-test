import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './model.js';
import { HTTP_STATUS } from './utils/constants.js';
import { getProfile } from './middleware/getProfile.js';

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

