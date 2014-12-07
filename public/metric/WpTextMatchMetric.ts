/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
/// <reference path="WpTextMetric.ts"/>
module metric {
  "use strict";

  export class WpTextMatchMetric extends WpTextMetric {
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
}
