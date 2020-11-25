import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Agent } from 'src/app/models/agent';
import { Department } from 'src/app/models/department';
import {
  companySamson,
  companySenses
} from 'src/mock-data/mock-companies-actors';
import { ChartSerieCollection } from '../data-graphing/models/chart-serie-collection';
import { ContactActivityConverterService } from '../data-graphing/services/contact-activity-converter.service';
import { ContactActivityAccessor } from '../models/contact-activity-accessor';
import {
  averageHoldTimeAccessor,
  averagePauseTimeAccessor
} from '../property-accessors/agent-record-accessors';
import {
  averageTalkTimeAccessor,
  inboundCallsAccessor
} from '../property-accessors/contact-activity-accessors';
import {
  abandonedCallsAccessor,
  answeredCallsAccessor,
  averageWaitTimeAccessor,
  averageWaitTimeBeforeAbandonmentAccessor
} from '../property-accessors/department-record-accessors';
import {
  achievedServiceLevelPercentage,
  achievedServiceLevelSeconds
} from '../property-accessors/record-accessors';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public stackedBarChartInputData: ChartSerieCollection[];
  public barChartData: ChartSerieCollection;
  public lineChartInputData: ChartSerieCollection[];

  public lineChartPieChartAccessors: ContactActivityAccessor[] = [];
  public stackedBarChartPieChartAccessors: ContactActivityAccessor[] = [];
  public barChartPieChartAccessors: ContactActivityAccessor[] = [];
  public barChartForDepartmentPieChartAccessors: ContactActivityAccessor[] = [];

  public agentZeroWithFewRecords: Agent = {
    company: companySamson,
    actorId: 'agentZero',
    contactActivities: (this.recordService.getRecordsByDateForAgent(
      moment('2019-10-30T12:09:29+01:00'),
      moment('2019-10-30T15:24:29+01:00')
    ) as ContactActivity[]).reverse()
  };

  public departmentTwo: Department = {
    company: companySenses,
    actorId: 'departmentTwo',
    subDepartments: [],
    contactActivities: (this.recordService.getRecordsByDateForDepartment(
      moment('2019-10-30T08:09:29+01:00'),
      moment('2019-11-30T15:24:29+01:00')
    ) as ContactActivity[]).reverse()
  };

  public departmentTwoWithALotOfRecords: Department = {
    company: companySenses,
    actorId: 'departmentTwo',
    subDepartments: [],
    contactActivities: (this.recordService.getRecordsByDateForDepartment(
      moment('2019-10-29T08:09:29+01:00'),
      moment('2019-11-30T15:24:29+01:00')
    ) as ContactActivity[]).reverse()
  };

  public barChartAccessors: ContactActivityAccessor[] = [
    averageHoldTimeAccessor,
    averagePauseTimeAccessor,
    averageTalkTimeAccessor
  ];

  public stackedBarChartAgentAccessors: ContactActivityAccessor[] = [
    averageHoldTimeAccessor,
    averagePauseTimeAccessor,
    averageTalkTimeAccessor,
    inboundCallsAccessor
  ];

  public barChartAccessorsDepartment: ContactActivityAccessor[] = [
    averageWaitTimeBeforeAbandonmentAccessor,
    averageWaitTimeAccessor,
    abandonedCallsAccessor,
    answeredCallsAccessor,
    achievedServiceLevelSeconds,
    achievedServiceLevelPercentage,
    inboundCallsAccessor,
    averageTalkTimeAccessor
  ];

  public departmentAccessors: ContactActivityAccessor[] = [
    abandonedCallsAccessor,
    answeredCallsAccessor,
    inboundCallsAccessor
  ];

  constructor(
    private contactActivityConverterService: ContactActivityConverterService,
    private recordService: RecordService
  ) {}

  public ngOnInit(): void {
    this.stackedBarChartInputData = this.contactActivityConverterService.convertActivitiesForStackedBarChart(
      this.agentZeroWithFewRecords,
      [
        averageHoldTimeAccessor,
        averagePauseTimeAccessor,
        averageTalkTimeAccessor
      ]
    );

    this.barChartData = this.contactActivityConverterService.convertActorActivitiesToChartSerieCollection(
      this.agentZeroWithFewRecords,
      averageHoldTimeAccessor
    );
  }

  public onSelectedPropertiesLineChart(event: ContactActivityAccessor[]): void {
    this.lineChartPieChartAccessors = [...event];
  }
  public onSelectedPropertiesStackedBarChart(
    event: ContactActivityAccessor[]
  ): void {
    this.stackedBarChartPieChartAccessors = [...event];
  }
  public onSelectedPropertiesBarChart(event: ContactActivityAccessor[]): void {
    this.barChartPieChartAccessors = [...event];
  }

  public onSelectedPropertiesBarChartForDepartment(
    event: ContactActivityAccessor[]
  ): void {
    this.barChartForDepartmentPieChartAccessors = [...event];
  }

  public onSelectedPropertiesStackedBarChartAgent(
    event: ContactActivityAccessor[]
  ): void {
    this.stackedBarChartPieChartAccessors = [...event];
  }
}
