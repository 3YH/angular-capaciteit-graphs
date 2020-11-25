import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actor } from 'src/app/models/actor';
import { ContactActivityAccessor } from 'src/app/models/contact-activity-accessor';
import { ColourScheme } from '../../models/colour-scheme';
import { SerieData } from '../../models/serie-data';
import { ContactActivityConverterService } from '../../services/contact-activity-converter.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy, OnChanges {
  public onDestroy$: Subject<void> = new Subject<void>();

  @Input() public selectedRange: { from: Date; till: Date };
  public pieChartData: SerieData[] = [];
  public asAverages: boolean = false;

  @Input() public actor: Actor;
  @Input() public contactActivityAccessors: ContactActivityAccessor[];

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
    domain: ['#f5883b', '#9be1fa', '#7190e3', '#f29f46', '#f5d7bf']
  };

  public inputChangeDetector: BehaviorSubject<
    ContactActivityAccessor[]
  > = new BehaviorSubject(this.contactActivityAccessors);

  constructor(
    private contactActivityConverterService: ContactActivityConverterService
  ) {}

  public ngOnInit(): void {
    this.inputChangeDetector.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.transformData(this.asAverages);
    });
    this.transformData(this.asAverages);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.transformData(this.asAverages);
  }

  public transformData(asAverages: boolean): void {
    this.pieChartData = this.contactActivityConverterService.convertActivitiesForPieChart(
      this.actor,
      this.contactActivityAccessors,
      asAverages
    );
  }

  public onSelectAsAverages(): void {
    this.transformData(this.asAverages);
  }

  public onResize(event: any): void {
    this.view = [event.target.innerWidth / this.divideWidth, this.height];
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
