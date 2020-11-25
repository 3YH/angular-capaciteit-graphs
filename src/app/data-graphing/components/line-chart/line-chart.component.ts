import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Actor } from 'src/app/models/actor';
import { ContactActivityAccessor } from 'src/app/models/contact-activity-accessor';
import { ChartSerieCollection } from '../../models/chart-serie-collection';
import { SerieData } from '../../models/serie-data';
import { ContactActivityConverterService } from '../../services/contact-activity-converter.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Output() public selectedRange: { startTime: Date; endTime: Date };
  @Input() public contactActivityAccessors: ContactActivityAccessor[];
  @Input() public actor: Actor;

  @Output() public selectedProperties: EventEmitter<
    ContactActivityAccessor[]
  > = new EventEmitter();

  public isSelected: boolean[] = [];

  public showXAxis: boolean = true;
  public showYAxis: boolean = true;
  public gradient: boolean = false;
  public showLegend: boolean = true;
  public xAxisLabel: string = '';
  public yAxisLabel: string = 'Time in seconds';
  public showXAxisLabel: boolean = true;
  public showYAxisLabel: boolean = true;
  public timeline: boolean = true;
  public view: number[];
  public divideWidth: number = 1.55;
  public height: number = 400;

  public lineChartData: ChartSerieCollection[] = [];

  public colorScheme: object = {
    domain: ['#f5883b', '#9be1fa', '#7190e3', '#f29f46', '#f5d7bf']
  };

  public ngOnInit(): void {
    this.contactActivityAccessors.forEach(() => this.isSelected.push(true));
    this.transformData();
    this.view = [innerWidth / this.divideWidth, this.height];
  }

  constructor(
    private contactActivityConverterService: ContactActivityConverterService
  ) {}

  public onResize(event: any): void {
    this.view = [event.target.innerWidth / this.divideWidth, this.height];
  }

  public onChipSelected(accessor: ContactActivityAccessor): void {
    this.isSelected[this.contactActivityAccessors.indexOf(accessor)] = !this
      .isSelected[this.contactActivityAccessors.indexOf(accessor)];
    this.transformData();
  }

  public transformData(): void {
    const selectedAccessors: ContactActivityAccessor[] = [];
    this.isSelected.forEach((isSelected: boolean, index: number) => {
      if (isSelected) {
        selectedAccessors.push(this.contactActivityAccessors[index]);
      }
    });

    this.selectedProperties.emit(selectedAccessors);

    this.lineChartData = this.contactActivityConverterService.convertActorActivitiesToChartSerieCollections(
      this.actor,
      selectedAccessors
    );

    this.formatDates();
  }

  public formatDates(): void {
    this.lineChartData.forEach((chartSerieCollectie: ChartSerieCollection) => {
      chartSerieCollectie.series.forEach((serieData: SerieData) => {
        serieData.name = moment(serieData.name).toDate();
        serieData.value = parseInt(serieData.value.toFixed(), 10);
      });
    });
  }
}
