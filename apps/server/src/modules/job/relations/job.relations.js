import { Job } from '../entity/job.entity.js';
import { Contract } from '../../contract/entity/contract.entity.js';

Job.belongsTo(Contract)
