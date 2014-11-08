class Extractor {
  static extract(text) {
    var animal = new Animal();
    animal.bodyLength = this.bodyLength(text);
    animal.bodyWeight = this.bodyWeight(text);
    return animal;
  }

  static bodyLength(text) {
    var patterns = [
      {re: /([.0-9]+)(?:m|メートル)/, exp: 1},
      {re: /([.0-9]+)(?:cm|センチメートル)/, exp: 1e-2},
      {re: /([.0-9]+)(?:mm|ミリメートル)/, exp: 1e-3}
    ];
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i];
      var m = p.re.exec(text);
      if (m != null) {
        return parseInt(m[1]) * p.exp;
      }
    }
  }

  static bodyWeight(text) {
    var patterns = [
      {re: /([.0-9]+)(?:g|グラム)/, exp: 1e-3},
      {re: /([.0-9]+)(?:kg|キログラム)/, exp: 1},
      {re: /([.0-9]+)(?:t|トン)/, exp: 1e3}
    ];
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i];
      var m = p.re.exec(text);
      if (m != null) {
        return parseInt(m[1]) * p.exp;
      }
    }
  }
  
  static recBodyLength(text){
    var patterns = [
      {re: /([.0-9]+)(?:m|メートル)/, exp: 1},
      {re: /([.0-9]+)(?:cm|センチメートル)/, exp: 1e-2},
      {re: /([.0-9]+)(?:mm|ミリメートル)/, exp: 1e-3}
    ];
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i];
      var m = p.re.exec(text);
      if (m != null) {
        return 1/(parseInt(m[1]) * p.exp);
      }
    }
  }

  static recBodyWeight(text) {
    var patterns = [
      {re: /([.0-9]+)(?:g|グラム)/, exp: 1e-3},
      {re: /([.0-9]+)(?:kg|キログラム)/, exp: 1},
      {re: /([.0-9]+)(?:t|トン)/, exp: 1e3}
    ];
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i];
      var m = p.re.exec(text);
      if (m != null) {
        return 1/(parseInt(m[1]) * p.exp);
      }
    }
  }

  static nameLength(text){
    var pattern = /(?:名称 =)([ァ-ン]+)/;
    var m = pattern.exec(text);
    if (m != null) {
      return m[1].length;
    }
  }

  static recNameLength(text){
    var pattern = /(?:名称 =)([ァ-ン]+)/;
    var m = pattern.exec(text);
    if (m != null) {
      return 1/(m[1].length);
    }
  }
}
