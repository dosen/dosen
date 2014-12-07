/// <reference path="WpTextMatchMetric.ts"/>
module metric {
  "use strict";

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
}
