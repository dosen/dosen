/// <reference path="../comp.ts" />
module comp {
  "use strict";

  export class Competitor implements ICompetitor {
    public name: string;
    public metrics: metric.IMetric[];
    public metricitems: metric.IMetricItem[];
    public score: number;
    public finish_style: string;
    public finish_text: string;
    public image_url = "//placehold.it/300x230";

    constructor(
      private $q: ng.IQService,
      private metric: metric.Factory,
      private wikipedia: wp.Wikipedia,
      metricNames: string[]
    ) {
      this.metrics = this.metric.createAll(metricNames);

      this.metricitems = [
        {name: this.metrics[0].name, text: "", value: 0, icon: ""},
        {name: this.metrics[1].name, text: "", value: 0, icon: ""},
        {name: this.metrics[2].name, text: "", value: 0, icon: ""}
      ];
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
      this.metric.create("TaxonomyImage")
      .getMetric(this.name)
      .then((m: metric.IMetricItem): void => {
        this.image_url = m.text;
      });
      return this.$q.all(promises);
    }
  }
}
