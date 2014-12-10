/// <reference path="../wp.ts"/>
/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
module metric {
  "use strict";

  export class WpTextMetric implements IMetric {
    public name: string;

    constructor(public wikipedia: wp.Wikipedia) {
    }

    public processText(text: string): IMetricItem {
      throw {name: "NotImplementedError"};
    }

    public getMetric(name: string): ng.IPromise<IMetricItem> {
      var that = this;
      return this.wikipedia
      .getText(name)
      .then(function (text: string): IMetricItem {
        return that.processText(text);
      });
    }
  }
}
