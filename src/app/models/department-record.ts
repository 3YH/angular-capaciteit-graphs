import { Record } from './record';

export interface DepartmentRecord extends Record {
  answeredCalls: number;
  abandonedCalls: number;
  averageWaitTime: number;
  averageWaitBeforeAbandonmentTime: number;
}
