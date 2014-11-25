/// <reference path="comp.ts"/>
class Extractor {
  public bodyLength(text: string): comp.IMetricItem {
    var patterns = [
      {re: /([0-9][.0-9]+)(?:m|メートル)/, exp: 1},
      {re: /([0-9][.0-9]+)(?:cm|センチメートル)/, exp: 1e-2},
      {re: /([0-9][.0-9]+)(?:mm|ミリメートル)/, exp: 1e-3}
    ];
    var metric = {name: "体長", text: "NOT FOUND(0)", value: 0};
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
  }

  public bodyWeight(text: string): comp.IMetricItem {
    var patterns = [
      {re: /([0-9][.0-9]+)(?:g|グラム)/, exp: 1e-3},
      {re: /([0-9][.0-9]+)(?:kg|キログラム)/, exp: 1},
      {re: /([0-9][.0-9]+)(?:t|トン)/, exp: 1e3}
    ];
    var metric = {name: "体重", text: "NOT FOUND(0)", value: 0};
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
  }

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
  }
}
