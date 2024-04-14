import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { HTTP_STATUS } from './utils/constants.js';
import { getProfile } from './middleware/getProfile.js';
import { sequelize } from './lib/db.js';
import './lib/relations.js'
import { config } from './utils/config.js';

export const app = express();

app.use(bodyParser.json());
app.use(cors({
	origin: config.clientBaseUrl,
}))

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

// FIXME needs clarification.
// Why not to just deposit by current profile id?
// app.post("/balances/deposit/:userId", getProfile, async (req, res) => {
app.post('/balances/deposit', getProfile, async (req, res) => {
	const { Profile, Job, Contract } = req.app.get('models');
	const { amount } = req.body;
	const { profile } = req;

	console.log('Profile before deposit', profile);

	if (profile.type !== 'client') {
		return res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Only clients can deposit money' });
	}

	// FIXME needs clarification.
	// The requirement says "a client can't deposit more than 25% his total of jobs to pay".
	//
	// const activeContracts = await Contract.findAll({
	//  where: {
	// 	 status: 'in_progress',
	// 	 ClientId: profile.id,
	//  },
	//  include: [
	// 	 {
	// 		 model: Job,
	// 		 as: 'Jobs',
	// 		 where: {
	// 		  paid: null,
	// 		 },
	// 	 },
	//  ],
	// });
	//
	// const jobs = activeContracts.flatMap((contract) => contract.Jobs);
	//
	// const total = jobs.reduce((acc, job) => acc + job.price, 0);
	// const quarterOfTotal = total / 4;
	// if (amount > quarterOfTotal) {
	//    console.log("amount > quarterOfTotal");
	//    return res.status(HTTP_STATUS.BAD_REQUEST).json({
	//      error: "Deposit amount exceeds the quarter of the total job price",
	//    });
	// }

	await Profile.increment('balance', {
		by: amount,
		where: { id: profile.id },
		returning: true,
	});

	res.status(HTTP_STATUS.OK).end();
});