/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
module metric {
  "use strict";

  export class FamilyNameLength extends WpTextMetric {
    public name = "科名長";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public processText(text: string): IMetricItem {
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      var m = /\|\s*科\s*=[\s\[']*([ァ-ンー]+)/.exec(text);
      if (m != null) {
        metric.text = m[1];
        metric.value = m[1].length;
      }

      return metric;
    }
  }
}
