/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
module metric {
  "use strict";

  export class ByteCount extends WpTextMetric {
    public name = "テキストのバイト数";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public processText(text: string): IMetricItem {
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      metric.text = text.length.toString();
      metric.value = text.length;

      return metric;
    }
  }
}
