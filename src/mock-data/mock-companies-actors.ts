import { Agent } from '../app/models/agent';
import { Company } from '../app/models/company';
import { Department } from '../app/models/department';
import { MOCK_AGENT_RECORDS } from './mock-agent-records';
import { MOCK_DEPARTMENT_RECORDS } from './mock-department-records';

export const companySenses: Company = {
  companyId: 'Senses B.V.'
};

export const companySamson: Company = {
  companyId: 'Samson Int.'
};

export const agentIpsum: Agent = {
  actorId: 'M. Ipsum',
  company: companySenses,
  contactActivities: MOCK_AGENT_RECORDS
};

export const departementLorem: Department = {
  company: companySamson,
  actorId: 'Lorem',
  subDepartments: [],
  contactActivities: MOCK_DEPARTMENT_RECORDS
};
