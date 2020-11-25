import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataGraphingModule } from './data-graphing/data-graphing.module';
import { MaterialDesignModule } from './material-design/material-design.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule,

    MaterialDesignModule,
    NavigationModule,
    DataGraphingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
