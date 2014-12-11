/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
module metric {
  "use strict";

  export class BitCardinarity extends WpTextMetric {
    public name = "ビット1の出現確率";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public processText(text: string): IMetricItem {
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      var bit1 = 0;
      var bit10 = 0;
      for (var i = 0; i < text.length; i++) {
        var binary = text.charCodeAt(i).toString(2);
        bit10 += binary.length;
        bit1 += binary.match(/1/g).length;
      }
      var card = bit1 / bit10;

      metric.text = card.toString();
      metric.value = card;

      return metric;
    }
  }
}
