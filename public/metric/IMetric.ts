/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="IMetricItem.ts"/>
module metric {
  export interface IMetric {
    name: string;

    getMetric(name: string): ng.IPromise<IMetricItem>;
  }
}
