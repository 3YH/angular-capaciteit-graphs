import { Injectable } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { ContactActivityAccessor } from 'src/app/models/contact-activity-accessor';
import { ChartSerieCollection } from '../models/chart-serie-collection';
import { SerieData } from '../models/serie-data';

@Injectable({
  providedIn: 'root'
})
export class ContactActivityConverterService {
  /**
   * Convert {@link ContactActivity} van een {@link Actor} om
   * naar een {@link ChartSerieCollection} array a.d.h.v. de opgegeven {@link ContactActivityAccessor}'s
   * om te gebruiken in verschillende Charts.
   */
  public convertActorActivitiesToChartSerieCollections(
    actor: Actor,
    contactActivityAccessors: ContactActivityAccessor[]
  ): ChartSerieCollection[] {
    const resultChartSerieCollections: ChartSerieCollection[] = [];

    contactActivityAccessors.forEach((accessor: ContactActivityAccessor) =>
      resultChartSerieCollections.push(
        this.convertActorActivitiesToChartSerieCollection(actor, accessor)
      )
    );
    return resultChartSerieCollections;
  }

  /**
   * Convert {@link ContactActivity} van een {@link Actor} om
   * naar een {@link ChartSerieCollection} array a.d.h.v. de opgegeven {@link ContactActivityAccessor}
   * om te gebruiken in verschillende Charts.
   */
  public convertActorActivitiesToChartSerieCollection(
    actor: Actor,
    contactActivityAccessor: ContactActivityAccessor
  ): ChartSerieCollection {
    const resultChartSerieCollection: ChartSerieCollection = {
      name: contactActivityAccessor.propertyName,
      series: []
    };

    actor.contactActivities.forEach((activity: ContactActivity) => {
      resultChartSerieCollection.series.push({
        name: activity.startTime,
        value: contactActivityAccessor.propertyAccessor(activity)
      });
    });

    return resultChartSerieCollection;
  }

  /**
   * Convert {@link ContactActivity} van meerdere {@link Actor} om
   * naar een {@link ChartSerieCollection} array a.d.h.v. de opgegeven {@link ContactActivityAccessor}
   * om te gebruiken voor vergelijkingen in verschillende Charts.
   */
  public convertMultipleActorsActivitiesToChartSerieCollections(
    actors: Actor[],
    contactActivityAccessor: ContactActivityAccessor
  ): ChartSerieCollection[] {
    const resultChartSerieCollections: ChartSerieCollection[] = [];

    actors.forEach((actor: Actor) => {
      const resultChartSerieCollection: ChartSerieCollection = {
        name: actor.actorId,
        series: []
      };

      actor.contactActivities.forEach((activity: ContactActivity) => {
        resultChartSerieCollection.series.push({
          name: activity.startTime,
          value: contactActivityAccessor.propertyAccessor(activity)
        } as SerieData);
      });

      resultChartSerieCollections.push(resultChartSerieCollection);
    });
    return resultChartSerieCollections;
  }

  /**
   * Convert {@link ContactActivity} van een {@link Actor} om
   * naar een {@link ChartSerieCollection} array a.d.h.v. de opgegeven {@link ContactActivityAccessor}s
   * om te gebruiken in een StackedBarChart.
   */
  public convertActivitiesForStackedBarChart(
    actor: Actor,
    contactActivityAccessors: ContactActivityAccessor[]
  ): ChartSerieCollection[] {
    const resultChartSerieCollections: ChartSerieCollection[] = [];

    actor.contactActivities.forEach((activity: ContactActivity) => {
      const resultChartSerieCollection: ChartSerieCollection = {
        name: activity.startTime,
        series: []
      };

      contactActivityAccessors.forEach((accessor: ContactActivityAccessor) => {
        resultChartSerieCollection.series.push({
          name: accessor.propertyName,
          value: accessor.propertyAccessor(activity)
        });
      });

      resultChartSerieCollections.push(resultChartSerieCollection);
    });
    return resultChartSerieCollections;
  }

  /**
   * Convert {@link ContactActivity} van een {@link Actor} om
   * naar een {@link SeriaData} array a.d.h.v. de opgegeven {@link ContactActivityAccessor}s
   * om te gebruiken in een PieChart.
   * Hierbij kan zowel het gemiddelde als het totaal getoond worden.
   */
  public convertActivitiesForPieChart(
    actor: Actor,
    contactActivityAccessors: ContactActivityAccessor[],
    asAverages: boolean
  ): SerieData[] {
    const resultSerieData: SerieData[] = [];
    contactActivityAccessors.forEach((accessor: ContactActivityAccessor) => {
      let totalValue: number = 0;
      actor.contactActivities.forEach(
        (activity: ContactActivity) =>
          (totalValue += accessor.propertyAccessor(activity))
      );
      resultSerieData.push({
        name: accessor.propertyName,
        value: asAverages
          ? totalValue / actor.contactActivities.length
          : totalValue
      });
    });
    return resultSerieData;
  }
}
