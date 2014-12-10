/// <reference path="../comp.ts"/>
module comp {
  "use strict";

  export interface ICompetitor {
    name: string;
    metrics: metric.IMetric[];
    metricitems: metric.IMetricItem[];
    score: number;
    finish_style: string;
    finish_text: string;
    image_url: string;
    image_loading: boolean;

    setMetrics(metricNames: string[]): void;
    update(): ng.IPromise<any[]>;
  }
}
