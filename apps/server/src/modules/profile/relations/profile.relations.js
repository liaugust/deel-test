import { Profile } from '../entity/profile.entity.js';
import { Contract } from '../../contract/entity/contract.entity.js';

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })