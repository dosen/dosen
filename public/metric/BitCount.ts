/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
module metric {
  "use strict";

  export class BitCount extends WpTextMetric {
    public name = "テキストのビットカウント";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public processText(text: string): IMetricItem {
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      var count = 0;
      for (var i = 0; i < text.length; i++) {
        count += text.charCodeAt(i).toString(2).match(/1/g).length;
      }

      metric.text = count.toString();
      metric.value = count;

      return metric;
    }
  }
}
