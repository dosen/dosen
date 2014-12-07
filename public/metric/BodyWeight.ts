/// <reference path="WpTextMatchMetric.ts"/>
module metric {
  "use strict";

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
}
