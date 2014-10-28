/// <reference path="animal.ts" />
var Extractor = (function () {
    function Extractor() {
    }
    Extractor.extract = function (text) {
        var animal = new Animal();
        animal.bodyLength = this.bodyLength(text);
        animal.bodyWeight = this.bodyWeight(text);
        return animal;
    };
    Extractor.bodyLength = function (text) {
        var patterns = [
            { re: /([.0-9]+)(?:m|メートル)/, exp: 1 },
            { re: /([.0-9]+)(?:cm|センチメートル)/, exp: 1e-2 },
            { re: /([.0-9]+)(?:mm|ミリメートル)/, exp: 1e-3 }
        ];
        for (var i = 0; i < patterns.length; i++) {
            var p = patterns[i];
            var m = p.re.exec(text);
            if (m != null) {
                return parseInt(m[1]) * p.exp;
            }
        }
    };
    Extractor.bodyWeight = function (text) {
        var patterns = [
            { re: /([.0-9]+)(?:g|グラム)/, exp: 1e-3 },
            { re: /([.0-9]+)(?:kg|キログラム)/, exp: 1 },
            { re: /([.0-9]+)(?:t|トン)/, exp: 1e3 }
        ];
        for (var i = 0; i < patterns.length; i++) {
            var p = patterns[i];
            var m = p.re.exec(text);
            if (m != null) {
                return parseInt(m[1]) * p.exp;
            }
        }
    };
    return Extractor;
})();
