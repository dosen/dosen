/// <reference path="comp.ts"/>
/// <reference path="wp.ts"/>
module metric {
  "use strict";

  export interface IMetricItem {
    name: string;
    text: string;
    value: number;
    icon?: string;
  }

  export class Factory {
    constructor(private wikipedia: wp.Wikipedia) {
    }

    public createRandom(index: number): IMetric {
      switch (index) {
        case 0:
          return new BodyLength(this.wikipedia);
        case 1:
          return new BodyWeight(this.wikipedia);
        case 2:
          return new NameLength(this.wikipedia);
      }
    }
  }

  export interface IMetric {
    name: string;

    getMetric(name: string): ng.IPromise<IMetricItem>;
  }

  class WpTextMetric implements IMetric {
    public name: string;
    public defaultText: string;
    public defaultValue: number;

    public patterns: {re: RegExp; exp: number}[];

    constructor(public wikipedia: wp.Wikipedia) {
    }

    public processText(text: string): IMetricItem {
      throw {name: "NotImplementedError"};
    }

    public getMetric(name: string): ng.IPromise<IMetricItem> {
      var patterns = this.patterns;
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      return this.wikipedia
      .getText(name)
      .then(this.processText.bind(this));
    }
  }

  class WpTextMatchMetric implements IMetric {
    public name: string;
    public defaultText: string;
    public defaultValue: number;

    public patterns: {re: RegExp; exp: number}[];

    constructor(public wikipedia: wp.Wikipedia) {
    }

    public getMetric(name: string): ng.IPromise<IMetricItem> {
      var patterns = this.patterns;
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      return this.wikipedia
      .getText(name)
      .then(function(text: string): IMetricItem {
        for (var i = 0; i < patterns.length; i++) {
          var p = patterns[i];
          var m = p.re.exec(text);
          if (m != null) {
            metric.text = m[0];
            metric.value = parseInt(m[1], 10) * p.exp;
            break;
          }
        }
        return metric;
      });
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

/*
  public recBodyLength(text: string): comp.IMetricItem {
    var metric = this.bodyLength(text);
    metric.name = "1/" + metric.name;
    metric.value = 1 / metric.value;
    return metric;
  }

  public recBodyWeight(text: string): comp.IMetricItem {
    var metric = this.bodyWeight(text);
    metric.name = "1/" + metric.name;
    metric.value = 1 / metric.value;
    return metric;
  }

  public nameLength(text: string): comp.IMetricItem {
    var metric = {name: "名前長", text: "NOT FOUND(0)", value: 0};
    var pattern = /(?:名称\s*=\s*)([ァ-ン]+)/;
    var m = pattern.exec(text);
    if (m != null) {
      metric.text = m[1];
      metric.value = m[1].length;
    }
    return metric;
  }

  public recNameLength(text: string): comp.IMetricItem {
    var metric = this.nameLength(text);
    metric.name = "1/" + metric.name;
    metric.value = 1 / metric.value;
    return metric;
  }*/
}
