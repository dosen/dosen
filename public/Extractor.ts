/// <reference path="Animal.ts"/>
/// <reference path="comp.ts"/>
class Extractor {
  public extract(text: string): Animal {
    var animal = new Animal();
    animal.bodyLength = this.bodyLength(text).value;
    animal.bodyWeight = this.bodyWeight(text).value;
    return animal;
  }

  public bodyLength(text: string): comp.IMetricItem {
    var patterns = [
      {re: /([.0-9]+)(?:m|メートル)/, exp: 1},
      {re: /([.0-9]+)(?:cm|センチメートル)/, exp: 1e-2},
      {re: /([.0-9]+)(?:mm|ミリメートル)/, exp: 1e-3}
    ];
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i];
      var m  = p.re.exec(text);
      if (m != null) {
        return {
          name: "体長",
          text: m[0],
          value: parseInt(m[1], 10) * p.exp
        };
      }
    }
  }

  public bodyWeight(text: string): comp.IMetricItem {
    var patterns = [
      {re: /([.0-9]+)(?:g|グラム)/, exp: 1e-3},
      {re: /([.0-9]+)(?:kg|キログラム)/, exp: 1},
      {re: /([.0-9]+)(?:t|トン)/, exp: 1e3}
    ];
    for (var i = 0; i < patterns.length; i++) {
      var p  = patterns[i];
      var m = p.re.exec(text);
      if (m != null) {
        return {
          name: "体重",
          text: m[0],
          value: parseInt(m[1], 10) * p.exp
        };
      }
    }
  }

  public recBodyLength(text: string): comp.IMetricItem {
    var patterns = [
      {re: /([.0-9]+)(?:m|メートル)/, exp: 1},
      {re: /([.0-9]+)(?:cm|センチメートル)/, exp: 1e-2},
      {re: /([.0-9]+)(?:mm|ミリメートル)/, exp: 1e-3}
    ];
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i];
      var m = p.re.exec(text);
      if (m != null) {
        return {
          name: "1/体長",
          text: m[0],
          value: 1 / (parseInt(m[1], 10) * p.exp)
        };
      }
    }
  }

  public recBodyWeight(text: string): comp.IMetricItem {
    var patterns = [
      {re: /([.0-9]+)(?:g|グラム)/, exp: 1e-3},
      {re: /([.0-9]+)(?:kg|キログラム)/, exp: 1},
      {re: /([.0-9]+)(?:t|トン)/, exp: 1e3}
    ];
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i];
      var m = p.re.exec(text);
      if (m != null) {
        return {
          name: "1/体重",
          text: m[0],
          value: 1 / (parseInt(m[1], 10) * p.exp)
        };
      }
    }
  }

  public nameLength(text: string): comp.IMetricItem {
    var pattern = /(?:名称\s*=\s*)([ァ-ン]+)/;
    var m = pattern.exec(text);
    if (m != null) {
      return {
        name: "名前長",
        text: m[1],
        value: m[1].length
      };
    }
  }

  public recNameLength(text: string): comp.IMetricItem {
    var pattern = /(?:名称\s*=\s*)([ァ-ン]+)/;
    var m = pattern.exec(text);
    if (m != null) {
      return {
        name: "1/名前長",
        text: m[1],
        value: 1 / m[1].length
      };
    }
  }
}
