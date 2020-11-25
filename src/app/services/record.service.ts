import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AgentRecord } from 'src/app/models/agent-record';
import { DepartmentRecord } from 'src/app/models/department-record';
import { Record } from 'src/app/models/record';
import { MOCK_AGENT_RECORDS } from 'src/mock-data/mock-agent-records';
import { MOCK_DEPARTMENT_RECORDS } from 'src/mock-data/mock-department-records';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor() {}

  public getRecordsByDateForAgent(
    startTime: moment.Moment,
    endTime: moment.Moment
  ): Record[] {
    return MOCK_AGENT_RECORDS.filter(
      (agentRecord: AgentRecord) =>
        moment.utc(agentRecord.startTime) >= startTime
    ).filter(
      (agentRecord: AgentRecord) => moment.utc(agentRecord.endTime) <= endTime
    );
  }

  public getRecordsByDateForDepartment(
    startTime: moment.Moment,
    endTime: moment.Moment
  ): Record[] {
    return MOCK_DEPARTMENT_RECORDS.filter(
      (departmentRecord: DepartmentRecord) =>
        moment.utc(departmentRecord.startTime) >= startTime
    ).filter(
      (departmentRecord: DepartmentRecord) =>
        moment.utc(departmentRecord.endTime) <= endTime
    );
  }
}
