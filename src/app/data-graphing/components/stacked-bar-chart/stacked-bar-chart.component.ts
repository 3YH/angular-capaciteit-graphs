import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { ContactActivityAccessor } from 'src/app/models/contact-activity-accessor';
import { isNullOrUndefined } from 'util';
import { ChartSerieCollection } from '../../models/chart-serie-collection';
import { ColourScheme } from '../../models/colour-scheme';
import { SerieData } from '../../models/serie-data';
import { ContactActivityConverterService } from '../../services/contact-activity-converter.service';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit {
  @Input() public title: string;

  @Input() public xAxisLabel: string;
  @Input() public yAxisLabel: string;
  public showXAxisLabel: boolean;
  public showYAxisLabel: boolean;

  @Input() public showXAxis: boolean = true;
  @Input() public showYAxis: boolean = true;
  @Input() public showLegend: boolean = true;
  @Input() public gradient: boolean = true;

  @Input() public actor: Actor;
  @Input() public contactActivityAccessors: ContactActivityAccessor[];
  @Output() public selectedProperties: EventEmitter<
    ContactActivityAccessor[]
  > = new EventEmitter();

  public isSelected: boolean[] = [];

  public stackedBarChartData: ChartSerieCollection[];

  public xAxisTickFormatting: () => string;
  public yAxisTickFormatting: () => number;
  public view: number[];
  public divideWidth: number = 1.55;
  public height: number = 430;

  public colorScheme: ColourScheme = {
    domain: ['#f5883b', '#9be1fa', '#7190e3', '#f29f46', '#f5d7bf']
  };

  constructor(
    private contactActivityConverterService: ContactActivityConverterService
  ) {}

  public ngOnInit(): void {
    this.contactActivityAccessors.forEach(() => this.isSelected.push(true));
    this.showXAxisLabel = isNullOrUndefined(this.xAxisLabel);
    this.showYAxisLabel = isNullOrUndefined(this.yAxisLabel);

    this.transformData();
    this.view = [innerWidth / this.divideWidth, this.height];
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

    this.stackedBarChartData = this.contactActivityConverterService.convertActivitiesForStackedBarChart(
      this.actor,
      selectedAccessors
    );

    this.testDataToProperNumbers();
  }

  /**
   * TODO Deze functie is ten behoeve van de POC en moet voor productie verwijderd worden.
   */
  private testDataToProperNumbers(): void {
    this.stackedBarChartData.forEach(
      (chartSerieCollection: ChartSerieCollection) =>
        chartSerieCollection.series.forEach((serie: SerieData) => {
          serie.value = parseInt(serie.value.toFixed(), 10);
        })
    );
  }

  public formatDate(value: string): string {
    return value.split('T')[0];
  }

  /**
   * Zorgt ervoor dat een number zonder decimalen wordt weergegevens.
   */
  public formatNumber(value: number): string {
    return value.toFixed(0);
  }

  public onResize(event: any): void {
    this.view = [event.target.innerWidth / this.divideWidth, this.height];
  }
}
