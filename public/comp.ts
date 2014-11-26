/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="metric.ts"/>
/// <reference path="wp.ts"/>
module comp {
  "use strict";

  export interface ICompetitor {
    name: string;
    metrics: metric.IMetric[];
    metricitems: metric.IMetricItem[];
    score: number;
    finish_style: string;
    finish_text: string;

    update(): ng.IPromise<any[]>;
  }

  export class Competitor implements ICompetitor {
    public name: string;
    public metrics: metric.IMetric[];
    public metricitems: metric.IMetricItem[];
    public score: number;
    public finish_style: string;
    public finish_text: string;

    constructor(
      private $q: ng.IQService,
      private metric: metric.Factory,
      private wikipedia: wp.Wikipedia
    ) {
      this.metrics = [
        this.metric.createRandom(0),
        this.metric.createRandom(1),
        this.metric.createRandom(2)
      ];

      this.metricitems = [
        {name: this.metrics[0].name, text: "", value: 0, icon: ""},
        {name: this.metrics[1].name, text: "", value: 0, icon: ""},
        {name: this.metrics[2].name, text: "", value: 0, icon: ""}
      ];
    }

    public update(): ng.IPromise<any[]> {
      var promises = [0, 1, 2].map((i: number): ng.IPromise<any> => {
        var metricitem = this.metricitems[i];
        return this.metric.createRandom(i)
        .getMetric(this.name)
        .then(function(m: metric.IMetricItem): void {
          metricitem.name = m.name;
          metricitem.text = m.text;
          metricitem.value = m.value;
        });
      });
      return this.$q.all(promises);
    }
  }

  export class Factory {
    constructor(
      private $q: ng.IQService,
      private metric: metric.Factory,
      private wikipedia: wp.Wikipedia
    ) {
    }

    public create(): Competitor {
      return new Competitor(this.$q, this.metric, this.wikipedia);
    }
  }
}
