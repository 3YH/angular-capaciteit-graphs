import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { ContactActivityAccessor } from 'src/app/models/contact-activity-accessor';
import { isNullOrUndefined } from 'util';
import { ColourScheme } from '../../models/colour-scheme';
import { SerieData } from '../../models/serie-data';
import { ContactActivityConverterService } from '../../services/contact-activity-converter.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public barChartData: SerieData[] = [];

  @Input() public actor: Actor;
  @Input() public contactActivityAccessors: ContactActivityAccessor[];

  @Output() public selectedProperties: EventEmitter<
    ContactActivityAccessor[]
  > = new EventEmitter();

  public showXAxis: boolean = true;
  public showYAxis: boolean = true;
  public gradient: boolean = false;
  public showLegend: boolean = false;
  @Input() public xAxisLabel: string;
  public yAxisLabel: string;
  public showXAxisLabel: boolean = true;
  public showYAxisLabel: boolean = true;
  public view: number[] = [];
  public divideWidth: number = 1.55;
  public height: number = 400;

  public colorScheme: ColourScheme = {
    domain: ['#36C2CF']
  };

  constructor(
    private contactActivityConverterService: ContactActivityConverterService
  ) {}

  public ngOnInit(): void {
    this.transformData(this.contactActivityAccessors[0]);

    this.formatWholeNumbers();

    this.showXAxisLabel = !isNullOrUndefined(this.xAxisLabel);
    this.showYAxisLabel = !isNullOrUndefined(this.yAxisLabel);

    this.view = [innerWidth / this.divideWidth, this.height];
  }

  private formatWholeNumbers(): void {
    this.barChartData.forEach((serieData: SerieData) => {
      serieData.value = parseInt(serieData.value.toFixed(), 10);
      if (serieData.value === 0) {
        serieData.value = 0.000001;
      }
    });
  }

  public onChipSelected(accessor: ContactActivityAccessor): void {
    this.transformData(accessor);
  }

  public transformData(accessor: ContactActivityAccessor): void {
    this.yAxisLabel = accessor.propertyName;

    this.barChartData.forEach(
      (serieData: SerieData) => (serieData.name = new Date(serieData.name))
    );
    this.barChartData = [
      ...this.contactActivityConverterService.convertActorActivitiesToChartSerieCollection(
        this.actor,
        accessor
      ).series
    ];
    this.selectedProperties.emit([accessor]);
    this.formatWholeNumbers();
  }

  public formatDate(value: string): string {
    return value.split('T')[0];
  }

  public onResize(event: any): void {
    this.view = [event.target.innerWidth / this.divideWidth, this.height];
  }
}
