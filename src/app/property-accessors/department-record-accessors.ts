import { ContactActivityAccessor } from '../models/contact-activity-accessor';
import { DepartmentRecord } from '../models/department-record';

export const averageWaitTimeAccessor: ContactActivityAccessor = {
  propertyName: 'Average Waittime',
  propertyAccessor: (record: DepartmentRecord): number => record.averageWaitTime
};

export const answeredCallsAccessor: ContactActivityAccessor = {
  propertyName: 'Answered Calls',
  propertyAccessor: (record: DepartmentRecord): number => record.answeredCalls
};

export const abandonedCallsAccessor: ContactActivityAccessor = {
  propertyName: 'Abandoned Calls',
  propertyAccessor: (record: DepartmentRecord): number => record.abandonedCalls
};

export const averageWaitTimeBeforeAbandonmentAccessor: ContactActivityAccessor = {
  propertyName: 'Average Wait Time Before Abandonment',
  propertyAccessor: (record: DepartmentRecord): number =>
    record.averageWaitBeforeAbandonmentTime
};
