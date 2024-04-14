import { Profile } from '../../profile/entity/profile.entity.js';
import { Contract } from '../entity/contract.entity.js';
import { Job } from '../../job/entity/job.entity.js';

Contract.belongsTo(Profile, { as: 'Contractor' })

Contract.belongsTo(Profile, { as: 'Client' })
Contract.hasMany(Job)