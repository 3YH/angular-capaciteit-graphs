import { AgentRecord } from '../models/agent-record';
import { ContactActivityAccessor } from '../models/contact-activity-accessor';

export const averageHoldTimeAccessor: ContactActivityAccessor = {
  propertyName: 'Average Holdtime',
  propertyAccessor: (record: AgentRecord): number => record.averageHoldTime
};

export const averagePauseTimeAccessor: ContactActivityAccessor = {
  propertyName: 'Average Pausetime',
  propertyAccessor: (record: AgentRecord): number => record.averagePauseTime
};

export const signOnTimeAccessor: ContactActivityAccessor = {
  propertyName: 'Sign On Time',
  propertyAccessor: (record: AgentRecord): number => record.signOnTime
};
