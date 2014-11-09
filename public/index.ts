/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="extractor.ts" />
/// <reference path="wikipedia.ts" />

interface IMetricItem {
  name: string;
  value: number;
  icon: string;
}

class MetricListCtrl {
  public name: string;
  public metrics: IMetricItem[];

  constructor(
    public wikipedia: Wikipedia,
    public extractor: Extractor
  ) {
    this.metrics = [
      {name: "metric1", value: 1, icon: ""},
      {name: "metric2", value: 2, icon: ""},
      {name: "metric3", value: 3, icon: ""}
    ];
  }

  public submit(): void {
    var metrics = this.metrics;
    var extractor = this.extractor;
    this.wikipedia.getText(this.name).then(function(text: string): void {
      var animal = extractor.extract(text);
      metrics[0].name = "bodyLength";
      metrics[0].value = animal.bodyLength;
      metrics[0].icon = "metric__icon--up";
      metrics[1].name = "bodyWeight";
      metrics[1].value = animal.bodyWeight;
      metrics[1].icon = "metric__icon--down";
    });
    this.wikipedia.getBacklinks(this.name).then(function(backlinks: IWpBacklink[]): void {
      metrics[2].name = "backlinks";
      metrics[2].value = backlinks.length;
      metrics[2].icon = "metric__icon--down";
    });
  }
}

var dosenApp = angular
  .module("dosenApp", [])
  .controller("MetricListCtrl", MetricListCtrl);
