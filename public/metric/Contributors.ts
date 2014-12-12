/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
module metric {
  "use strict";

  export class Contributors implements IMetric {
    public name = "編集者数";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    constructor(private wikipedia: wp.Wikipedia) {
    }

    public getMetric(name: string): ng.IPromise<IMetricItem> {
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };
      return this.wikipedia.getContributors(name)
      .then(function (data: wp.IUser[]): IMetricItem {
        metric.text = data.length.toString();
        metric.value = data.length;
        return metric;
      });
    }
  }
}
