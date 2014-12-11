/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
module metric {
  "use strict";

  export class Punctuations extends WpTextMetric {
    public name = "、。，．,.(句読点)の数";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public processText(text: string): IMetricItem {
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      var m = text.match(/[、。，．,.]/g);
      if (m != null) {
        metric.text = m.length.toString();
        metric.value = m.length;
      }

      return metric;
    }
  }
}
