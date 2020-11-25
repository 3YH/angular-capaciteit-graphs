import { Record } from './record';

export interface AgentRecord extends Record {
  signOnTime: number;
  averageHoldTime: number;
  averagePauseTime: number;
}
