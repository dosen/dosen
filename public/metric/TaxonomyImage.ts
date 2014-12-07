/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
/// <reference path="WpTextMetric.ts"/>
module metric {
  "use strict";

  export class TaxonomyImage implements IMetric {
    public name = "画像";
    public defaultText = "NO IMAGE";
    public defaultValue = 0;

    constructor(private wikipedia: wp.Wikipedia) {
    }

    public getMetric(name: string): ng.IPromise<IMetricItem> {
      var wikipedia = this.wikipedia;
      return this.wikipedia.getText(name)
      .then(function (text: string): ng.IPromise<string> {
        var m = /(?:画像)[^\[]*\[\[([^|]*)\|/.exec(text);
        if (m != null) {
          return wikipedia.getImage(m[1]);
        } else {
          return null;
        }
      })
      .then(function(url: string): IMetricItem {
        return {
          name: "画像",
          text: url,
          value: 0
        };
      });
    }
  }
}
