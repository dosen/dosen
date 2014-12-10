/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
module metric {
  "use strict";

  export class ZoologicalNameLength extends WpTextMetric {
    public name = "学名";
    public defaultText = "NOT FOUND";
    public defaultValue = 0;

    public processText(text: string): IMetricItem {
      var metric = {
        name: this.name,
        text: this.defaultText,
        value: this.defaultValue
      };

      var m = /\{\{(?:Wikis|S)pecies\|([^}|]*)/.exec(text);
      if (m != null) {
        metric.text = m[1];
        metric.value = m[1].length;
      } else {
        m = /\|\s*学名\s*=[\s']*\[\[(?:[^|]*\|)?([^\]]+)/.exec(text);
        if (m != null) {
          metric.text = m[1];
          metric.value = m[1].length;
        } else {
          m = /\|\s*学名\s*=[\s']*([a-zA-Z0-9 ]*[a-zA-Z0-9])/.exec(text);
          if (m != null) {
            metric.text = m[1];
            metric.value = m[1].length;
          }
        }
      }

      return metric;
    }
  }
}
