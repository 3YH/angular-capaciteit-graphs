import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartCommonModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';

@NgModule({
  declarations: [
    StackedBarChartComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    ChartCommonModule,
    MaterialDesignModule
  ],
  exports: [
    StackedBarChartComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent
  ]
})
export class DataGraphingModule {}
