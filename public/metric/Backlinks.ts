/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
module metric {
  "use strict";

  export class Backlinks implements IMetric {
    public name = "バックリンク数";
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
      return this.wikipedia.getBacklinks(name)
      .then(function (backlinks: wp.IBacklink[]): IMetricItem {
        metric.text = backlinks.length.toString();
        metric.value = backlinks.length;
        return metric;
      });
    }
  }
}
