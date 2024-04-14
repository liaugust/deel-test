import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProfile } from './middleware/getProfile.js';
import { sequelize } from './lib/db.js';
import './lib/relations.js'
import { config } from './utils/config.js';
import { ProfileController } from './modules/profile/controller/profile.controller.js';
import { ContractController } from './modules/contract/controller/contract.controller.js';
import { JobController } from './modules/job/controller/job.controller.js';

export const app = express();

app.use(bodyParser.json());
app.use(cors({
	origin: config.clientBaseUrl,
}))

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

const profileController = new ProfileController();
const contractController = new ContractController();
const jobController = new JobController()

app.get('/contracts/:id', getProfile, (req, res) => contractController.getById(req, res))
app.get('/jobs/unpaid', getProfile, (req, res) => contractController.getUnpaidJobs(req, res))
app.post('/jobs/:jobId/pay', getProfile, (req, res) => jobController.payForJob(req, res));

app.get('/profiles', (req, res) => profileController.getProfiles(req, res));
app.get('/profile', getProfile, (req, res) => profileController.getProfile(req, res));
app.get('/contractors', getProfile, (req, res) => profileController.getContractorsByClientId(req, res));

// FIXME needs clarification.
// Why not to just deposit by current profile id?
// app.post("/balances/deposit/:userId", getProfile, async (req, res) => {
app.post('/balances/deposit', getProfile, (req
	, res) => profileController.deposit(req, res));