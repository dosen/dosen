/// <reference path="../comp.ts" />
module comp {
  "use strict";

  export class Competitor implements ICompetitor {
    public name: string;
    public metrics: metric.IMetric[];
    public score: number;
    public finish_style: string;
    public finish_text: string;
    public image_url = "//placehold.it/300x230";
    public image_notfound = "//placehold.it/300x230/226100/ffffff&text=NOT%20FOUND"
    public image_loading = false;

    public metricitems: metric.IMetricItem[] = [
      {name: "", text: "", value: 0, icon: ""},
      {name: "", text: "", value: 0, icon: ""},
      {name: "", text: "", value: 0, icon: ""}
    ];

    constructor(
      private $q: ng.IQService,
      private metric: metric.Factory,
      private wikipedia: wp.Wikipedia,
      metricNames: string[]
    ) {
      this.setMetrics(metricNames);
    }

    public setMetrics(metricNames: string[]): void {
      this.metrics = this.metric.createAll(metricNames);

      for (var i = 0; i < 3; i++) {
        this.metricitems[i].name = this.metrics[i].name;
      }
    }

    public update(): ng.IPromise<any[]> {
      var promises = [0, 1, 2].map((i: number): ng.IPromise<any> => {
        var metricitem = this.metricitems[i];
        return this.metrics[i]
        .getMetric(this.name)
        .then(function(m: metric.IMetricItem): void {
          metricitem.name = m.name;
          metricitem.text = m.text;
          metricitem.value = m.value;
        });
      });
      this.image_loading = true;
      this.metric.create("TaxonomyImage")
      .getMetric(this.name)
      .then((m: metric.IMetricItem): void => {
        this.image_url = m.text;
      }, (): void => {
        this.image_url = this.image_notfound;
      })
      .finally((): void => {
        this.image_loading = false;
      });
      return this.$q.all(promises);
    }
  }
}
