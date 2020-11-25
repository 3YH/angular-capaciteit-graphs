import { ContactActivityAccessor } from '../models/contact-activity-accessor';

export const averageTalkTimeAccessor: ContactActivityAccessor = {
  propertyName: 'Average Talktime',
  propertyAccessor: (contactActivity: ContactActivity): number =>
    contactActivity.averageTalkTime
};

export const inboundCallsAccessor: ContactActivityAccessor = {
  propertyName: 'Inbound calls',
  propertyAccessor: (contactActivity: ContactActivity): number =>
    contactActivity.inboundCalls
};
