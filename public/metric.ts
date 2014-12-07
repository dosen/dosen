/// <reference path="comp.ts"/>
/// <reference path="wp.ts"/>
/// <reference path="metric/Factory.ts"/>
module metric {
  "use strict";

  export interface IMetricItem {
    name: string;
    text: string;
    value: number;
    icon?: string;
  }

  export interface IMetric {
    name: string;

    getMetric(name: string): ng.IPromise<IMetricItem>;
  }

  class WpTextMetric implements IMetric {
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

  class WpTextMatchMetric extends WpTextMetric {
    public name: string;
    public defaultText: string;
    public defaultValue: number;

    public patterns: {re: RegExp; exp: number}[];

    public processText(text: string): IMetricItem {
      var mi = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      for (var i = 0; i < this.patterns.length; i++) {
        var p = this.patterns[i];
        var m = p.re.exec(text);
        if (m != null) {
          mi.text = m[0];
          mi.value = parseInt(m[1], 10) * p.exp;
          break;
        }
      }

      return mi;
    }
  }

  export class BodyLength extends WpTextMatchMetric {
    public name = "体長";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public patterns = [
      {re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:m|メートル)/, exp: 1},
      {re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:cm|センチメートル)/, exp: 1e-2},
      {re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:mm|ミリメートル)/, exp: 1e-3}
    ];
  }

  export class BodyWeight extends WpTextMatchMetric {
    public name = "体重";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public patterns = [
      {re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:g|グラム)/, exp: 1e-3},
      {re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:kg|キログラム)/, exp: 1},
      {re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:t|トン)/, exp: 1e3}
    ];
  }

  export class NameLength extends WpTextMetric {
    public name = "名前長";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public processText(text: string): IMetricItem {
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      var m = /(?:名称\s*=\s*)([ァ-ン]+)/.exec(text);
      if (m != null) {
        metric.text = m[1];
        metric.value = m[1].length;
      }

      return metric;
    }
  }

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
        metric.value = backlinks.length;
        return metric;
      });
    }
  }

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
