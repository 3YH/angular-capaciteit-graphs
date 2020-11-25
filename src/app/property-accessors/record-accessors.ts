import { ContactActivityAccessor } from '../models/contact-activity-accessor';
import { Record } from '../models/record';

export const achievedServiceLevelPercentage: ContactActivityAccessor = {
  propertyName: 'Achieved Service Level Percentage',
  propertyAccessor: (record: Record): number =>
    record.achievedServiceLevelPercentage
};

export const achievedServiceLevelSeconds: ContactActivityAccessor = {
  propertyName: 'Achieved Service Level Seconds',
  propertyAccessor: (record: Record): number =>
    record.achievedServiceLevelSeconds
};
