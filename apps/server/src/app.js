const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')
const { getProfile } = require('./middleware/getProfile')
const { HTTP_STATUS } = require('./utils/constants');
const app = express();
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

module.exports = app;
