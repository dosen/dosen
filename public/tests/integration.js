/// <reference path="../typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
var wp;
(function (wp) {
    "use strict";
    var GetText = (function () {
        function GetText($http) {
            this.$http = $http;
            this.endpoint = "//ja.wikipedia.org/w/api.php";
            this.query = "?format=json&callback=JSON_CALLBACK" + "&action=query&prop=revisions&rvprop=content&redirects";
            this.cache = {};
        }
        GetText.prototype.get = function (title) {
            if (this.cache[title]) {
                return this.cache[title];
            }
            console.debug("getting from Wikipadia the text of " + title);
            var promise = this.$http.jsonp(this.endpoint + this.query, { params: { titles: title } }).then(function (arg) {
                var pages = arg.data["query"]["pages"];
                for (var k in pages) {
                    if (pages.hasOwnProperty(k)) {
                        console.debug("retrieved the text of " + title);
                        return pages[k]["revisions"][0]["*"];
                    }
                }
            });
            this.cache[title] = promise;
            return promise;
        };
        return GetText;
    })();
    wp.GetText = GetText;
})(wp || (wp = {}));
/// <reference path="../typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
var wp;
(function (wp) {
    "use strict";
    var GetThumb = (function () {
        function GetThumb($http) {
            this.$http = $http;
            this.endpoint = "//ja.wikipedia.org/w/api.php";
            this.query = "?format=json&callback=JSON_CALLBACK&continue=" + "&action=query&prop=imageinfo&iiprop=url&iiurlheight=320";
            this.cache = {};
        }
        GetThumb.prototype.get = function (title) {
            if (this.cache[title]) {
                return this.cache[title];
            }
            console.debug("getting from Wikipadia the thumbnail of " + title);
            var promise = this.$http.jsonp(this.endpoint + this.query, { params: { titles: title } }).then(function (arg) {
                var imageinfo = arg.data["query"]["pages"]["-1"]["imageinfo"];
                console.debug("retrieved the thumbnail of " + title);
                return imageinfo[0]["thumburl"];
            });
            this.cache[title] = promise;
            return promise;
        };
        return GetThumb;
    })();
    wp.GetThumb = GetThumb;
})(wp || (wp = {}));
/// <reference path="../typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
var wp;
(function (wp) {
    "use strict";
    var GetBacklinks = (function () {
        function GetBacklinks($http) {
            this.$http = $http;
            this.endpoint = "//ja.wikipedia.org/w/api.php";
            this.query = "?format=json&callback=JSON_CALLBACK&continue=" + "&action=query&prop=imageinfo&iiprop=url&iiurlheight=320";
            this.cache = {};
        }
        GetBacklinks.prototype.get = function (title) {
            if (this.cache[title]) {
                return this.cache[title];
            }
            var url = this.endpoint + "?format=json&callback=JSON_CALLBACK" + "&action=query&list=backlinks&bllimit=500";
            console.debug("getting from Wikipadia the backlinks of " + title);
            var promise = this.$http.jsonp(url, { params: { bltitle: title } }).then(function (arg) {
                console.debug("retrieved the backlinks of " + title);
                return arg.data["query"]["backlinks"];
            });
            this.cache[title] = promise;
            return promise;
        };
        return GetBacklinks;
    })();
    wp.GetBacklinks = GetBacklinks;
})(wp || (wp = {}));
/// <reference path="../typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
var wp;
(function (wp) {
    "use strict";
    var GetTransclusions = (function () {
        function GetTransclusions($http) {
            this.$http = $http;
            this.endpoint = "//ja.wikipedia.org/w/api.php";
            this.query = "?format=json&callback=JSON_CALLBACK&continue=" + "&action=query&generator=transcludedin&prop=info&gtilimit=500";
            this.cache = {};
        }
        GetTransclusions.prototype.get = function (title) {
            if (this.cache[title]) {
                return this.cache[title];
            }
            console.debug("getting from Wikipadia the transclusions of " + title);
            var promise = this.$http.jsonp(this.endpoint + this.query, { params: { titles: title } }).then(function (arg) {
                console.debug("retrieved the transclusions of " + title);
                return arg.data["query"]["pages"];
            });
            this.cache[title] = promise;
            return promise;
        };
        return GetTransclusions;
    })();
    wp.GetTransclusions = GetTransclusions;
})(wp || (wp = {}));
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="wp/GetText.ts" />
/// <reference path="wp/GetThumb.ts" />
/// <reference path="wp/GetBacklinks.ts" />
/// <reference path="wp/GetTransclusions.ts" />
/* tslint:disable:no-string-literal */
var wp;
(function (wp) {
    "use strict";
    var Wikipedia = (function () {
        function Wikipedia($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.endpoint = "//ja.wikipedia.org/w/api.php";
            this._getText = new wp.GetText(this.$http);
            this._getThumb = new wp.GetThumb(this.$http);
            this._getBacklinks = new wp.GetBacklinks(this.$http);
            this._getTransclusions = new wp.GetTransclusions(this.$http);
        }
        Wikipedia.prototype.getText = function (title) {
            return this._getText.get(title);
        };
        Wikipedia.prototype.getBacklinks = function (title) {
            return this._getBacklinks.get(title);
        };
        Wikipedia.prototype.getTransclusions = function (title) {
            return this._getTransclusions.get(title);
        };
        Wikipedia.prototype.getImage = function (title) {
            var url = this.endpoint + "?format=json&callback=JSON_CALLBACK&continue=" + "&action=query&prop=imageinfo&iiprop=url";
            console.debug("getting from Wikipadia the image of " + title);
            return this.$http.jsonp(url, { params: { titles: title } }).then(function (arg) {
                var imageinfo = arg.data["query"]["pages"]["-1"]["imageinfo"];
                console.debug("retrieved the image of " + title);
                return imageinfo[0]["url"];
            });
        };
        Wikipedia.prototype.getThumb = function (title) {
            return this._getThumb.get(title);
        };
        return Wikipedia;
    })();
    wp.Wikipedia = Wikipedia;
})(wp || (wp = {}));
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="IMetricItem.ts"/>
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
var metric;
(function (_metric) {
    "use strict";
    var Backlinks = (function () {
        function Backlinks(wikipedia) {
            this.wikipedia = wikipedia;
            this.name = "バックリンク数";
            this.defaultText = "NOT FOUND";
            this.defaultValue = 0;
        }
        Backlinks.prototype.getMetric = function (name) {
            var metric = {
                name: this.name,
                text: this.defaultText,
                value: this.defaultValue
            };
            return this.wikipedia.getBacklinks(name).then(function (backlinks) {
                console.log(backlinks);
                metric.text = backlinks.length.toString();
                metric.value = backlinks.length;
                return metric;
            });
        };
        return Backlinks;
    })();
    _metric.Backlinks = Backlinks;
})(metric || (metric = {}));
/// <reference path="../wp.ts"/>
/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
var metric;
(function (metric) {
    "use strict";
    var WpTextMetric = (function () {
        function WpTextMetric(wikipedia) {
            this.wikipedia = wikipedia;
        }
        WpTextMetric.prototype.processText = function (text) {
            throw { name: "NotImplementedError" };
        };
        WpTextMetric.prototype.getMetric = function (name) {
            var that = this;
            return this.wikipedia.getText(name).then(function (text) {
                return that.processText(text);
            });
        };
        return WpTextMetric;
    })();
    metric.WpTextMetric = WpTextMetric;
})(metric || (metric = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
/// <reference path="WpTextMetric.ts"/>
var metric;
(function (metric) {
    "use strict";
    var WpTextMatchMetric = (function (_super) {
        __extends(WpTextMatchMetric, _super);
        function WpTextMatchMetric() {
            _super.apply(this, arguments);
        }
        WpTextMatchMetric.prototype.processText = function (text) {
            var mi = {
                name: this.name,
                text: this.defaultText,
                value: this.defaultValue
            };
            for (var i = 0; i < this.patterns.length; i++) {
                var p = this.patterns[i];
                var m = p.re.exec(text);
                if (m != null) {
                    mi.text = m[0];
                    mi.value = parseInt(m[1], 10) * p.exp;
                    break;
                }
            }
            return mi;
        };
        return WpTextMatchMetric;
    })(metric.WpTextMetric);
    metric.WpTextMatchMetric = WpTextMatchMetric;
})(metric || (metric = {}));
/// <reference path="WpTextMatchMetric.ts"/>
var metric;
(function (metric) {
    "use strict";
    var BodyLength = (function (_super) {
        __extends(BodyLength, _super);
        function BodyLength() {
            _super.apply(this, arguments);
            this.name = "体長";
            this.defaultText = "NOT FOUND";
            this.defaultValue = 0;
            this.patterns = [
                { re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:m|メートル)/, exp: 1 },
                { re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:cm|センチメートル)/, exp: 1e-2 },
                { re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:mm|ミリメートル)/, exp: 1e-3 }
            ];
        }
        return BodyLength;
    })(metric.WpTextMatchMetric);
    metric.BodyLength = BodyLength;
})(metric || (metric = {}));
/// <reference path="WpTextMatchMetric.ts"/>
var metric;
(function (metric) {
    "use strict";
    var BodyWeight = (function (_super) {
        __extends(BodyWeight, _super);
        function BodyWeight() {
            _super.apply(this, arguments);
            this.name = "体重";
            this.defaultText = "NOT FOUND";
            this.defaultValue = 0;
            this.patterns = [
                { re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:g|グラム)/, exp: 1e-3 },
                { re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:kg|キログラム)/, exp: 1 },
                { re: /([1-9][0-9]*(?:\.[0-9]+)?)(?:t|トン)/, exp: 1e3 }
            ];
        }
        return BodyWeight;
    })(metric.WpTextMatchMetric);
    metric.BodyWeight = BodyWeight;
})(metric || (metric = {}));
/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
var metric;
(function (_metric) {
    "use strict";
    var NameLength = (function (_super) {
        __extends(NameLength, _super);
        function NameLength() {
            _super.apply(this, arguments);
            this.name = "名前長";
            this.defaultText = "NOT FOUND";
            this.defaultValue = 0;
        }
        NameLength.prototype.processText = function (text) {
            var metric = {
                name: this.name,
                text: this.defaultText,
                value: this.defaultValue
            };
            var m = /(?:名称\s*=\s*)([ァ-ンー]+)/.exec(text);
            if (m != null) {
                metric.text = m[1];
                metric.value = m[1].length;
            }
            return metric;
        };
        return NameLength;
    })(_metric.WpTextMetric);
    _metric.NameLength = NameLength;
})(metric || (metric = {}));
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../wp.ts"/>
/// <reference path="IMetricItem.ts"/>
/// <reference path="IMetric.ts"/>
/// <reference path="WpTextMetric.ts"/>
var metric;
(function (metric) {
    "use strict";
    var TaxonomyImage = (function () {
        function TaxonomyImage(wikipedia) {
            this.wikipedia = wikipedia;
            this.name = "画像";
            this.defaultText = "NO IMAGE";
            this.defaultValue = 0;
        }
        TaxonomyImage.prototype.getMetric = function (name) {
            var wikipedia = this.wikipedia;
            return this.wikipedia.getText(name).then(function (text) {
                var m = /(?:画像)[^\[]*\[\[([^|]*)\|/.exec(text);
                if (m != null) {
                    return wikipedia.getThumb(m[1]);
                }
                else {
                    return null;
                }
            }).then(function (url) {
                return {
                    name: "画像",
                    text: url,
                    value: 0
                };
            });
        };
        return TaxonomyImage;
    })();
    metric.TaxonomyImage = TaxonomyImage;
})(metric || (metric = {}));
/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
var metric;
(function (_metric) {
    "use strict";
    var ZoologicalNameLength = (function (_super) {
        __extends(ZoologicalNameLength, _super);
        function ZoologicalNameLength() {
            _super.apply(this, arguments);
            this.name = "学名";
            this.defaultText = "NOT FOUND";
            this.defaultValue = 0;
        }
        ZoologicalNameLength.prototype.processText = function (text) {
            var metric = {
                name: this.name,
                text: this.defaultText,
                value: this.defaultValue
            };
            var m = /\{\{(?:Wikis|S)pecies\|([^}]*)\}\}/.exec(text);
            if (m != null) {
                metric.text = m[1];
                metric.value = m[1].replace(/¥s/g, "").length;
            }
            return metric;
        };
        return ZoologicalNameLength;
    })(_metric.WpTextMetric);
    _metric.ZoologicalNameLength = ZoologicalNameLength;
})(metric || (metric = {}));
/// <reference path="IMetricItem.ts"/>
/// <reference path="WpTextMetric.ts"/>
var metric;
(function (_metric) {
    "use strict";
    var FamilyNameLength = (function (_super) {
        __extends(FamilyNameLength, _super);
        function FamilyNameLength() {
            _super.apply(this, arguments);
            this.name = "科名長";
            this.defaultText = "NOT FOUND";
            this.defaultValue = 0;
        }
        FamilyNameLength.prototype.processText = function (text) {
            var metric = {
                name: this.name,
                text: this.defaultText,
                value: this.defaultValue
            };
            var m = /\|\s*科\s*=\s*(?:\[\[)?([ァ-ンー]*)/.exec(text);
            if (m != null) {
                metric.text = m[1];
                metric.value = m[1].length;
            }
            return metric;
        };
        return FamilyNameLength;
    })(_metric.WpTextMetric);
    _metric.FamilyNameLength = FamilyNameLength;
})(metric || (metric = {}));
/// <reference path="../wp.ts"/>
/// <reference path="IMetric.ts"/>
/// <reference path="Backlinks.ts"/>
/// <reference path="BodyLength.ts"/>
/// <reference path="BodyWeight.ts"/>
/// <reference path="NameLength.ts"/>
/// <reference path="TaxonomyImage.ts"/>
/// <reference path="ZoologicalNameLength.ts"/>
/// <reference path="FamilyNameLength.ts"/>
var metric;
(function (metric) {
    "use strict";
    var Factory = (function () {
        function Factory(wikipedia) {
            this.wikipedia = wikipedia;
        }
        Factory.prototype.create = function (name) {
            switch (name) {
                case "Backlinks":
                    return new metric.Backlinks(this.wikipedia);
                case "BodyLength":
                    return new metric.BodyLength(this.wikipedia);
                case "BodyWeight":
                    return new metric.BodyWeight(this.wikipedia);
                case "NameLength":
                    return new metric.NameLength(this.wikipedia);
                case "TaxonomyImage":
                    return new metric.TaxonomyImage(this.wikipedia);
                case "ZoologicalNameLength":
                    return new metric.ZoologicalNameLength(this.wikipedia);
                case "FamilyNameLength":
                    return new metric.FamilyNameLength(this.wikipedia);
            }
        };
        Factory.prototype.createAll = function (names) {
            var array = [];
            for (var i = 0; i < names.length; i++) {
                array.push(this.create(names[i]));
            }
            return array;
        };
        return Factory;
    })();
    metric.Factory = Factory;
})(metric || (metric = {}));
/// <reference path="../comp.ts" />
var comp;
(function (comp) {
    "use strict";
    var Competitor = (function () {
        function Competitor($q, metric, wikipedia, metricNames) {
            this.$q = $q;
            this.metric = metric;
            this.wikipedia = wikipedia;
            this.image_url = "//placehold.it/300x230";
            this.metricitems = [
                { name: "", text: "", value: 0, icon: "" },
                { name: "", text: "", value: 0, icon: "" },
                { name: "", text: "", value: 0, icon: "" }
            ];
            this.setMetrics(metricNames);
        }
        Competitor.prototype.setMetrics = function (metricNames) {
            this.metrics = this.metric.createAll(metricNames);
            for (var i = 0; i < 3; i++) {
                this.metricitems[i].name = this.metrics[i].name;
            }
        };
        Competitor.prototype.update = function () {
            var _this = this;
            var promises = [0, 1, 2].map(function (i) {
                var metricitem = _this.metricitems[i];
                return _this.metrics[i].getMetric(_this.name).then(function (m) {
                    metricitem.name = m.name;
                    metricitem.text = m.text;
                    metricitem.value = m.value;
                });
            });
            this.metric.create("TaxonomyImage").getMetric(this.name).then(function (m) {
                _this.image_url = m.text;
            });
            return this.$q.all(promises);
        };
        return Competitor;
    })();
    comp.Competitor = Competitor;
})(comp || (comp = {}));
/// <reference path="../comp.ts"/>
var comp;
(function (comp) {
    "use strict";
    var Factory = (function () {
        function Factory($q, metric, wikipedia) {
            this.$q = $q;
            this.metric = metric;
            this.wikipedia = wikipedia;
        }
        Factory.prototype.create = function (metricNames) {
            return new comp.Competitor(this.$q, this.metric, this.wikipedia, metricNames);
        };
        return Factory;
    })();
    comp.Factory = Factory;
})(comp || (comp = {}));
/// <reference path="../comp.ts"/>
var comp;
(function (comp) {
    "use strict";
})(comp || (comp = {}));
var ctrl;
(function (ctrl) {
    "use strict";
    var RandomMetrics = (function () {
        function RandomMetrics() {
            this.table = [
                [
                    { name: "BodyLength", weight: 1 },
                    { name: "BodyWeight", weight: 1 },
                ],
                [
                    { name: "BodyLength", weight: 1 },
                    { name: "NameLength", weight: 1 }
                ],
                [
                    { name: "Backlinks", weight: 1 },
                    { name: "BodyWeight", weight: 1 },
                    { name: "ZoologicalNameLength", weight: 1 },
                    { name: "FamilyNameLength", weight: 1 },
                ]
            ];
        }
        RandomMetrics.prototype.select = function (index) {
            var list = this.table[index];
            var whole = 0;
            for (var i = 0; i < list.length; i++) {
                whole += list[i].weight;
            }
            var rand = Math.random() * whole;
            var acc = 0;
            for (i = 0; i < list.length; i++) {
                var item = list[i];
                acc += item.weight;
                if (rand < acc) {
                    return item.name;
                }
            }
        };
        RandomMetrics.prototype.selectAll = function () {
            var names = [];
            for (var i = 0; i < this.table.length; i++) {
                names.push(this.select(i));
            }
            return names;
        };
        return RandomMetrics;
    })();
    ctrl.RandomMetrics = RandomMetrics;
})(ctrl || (ctrl = {}));
/// <reference path="../comp.ts"/>
/// <reference path="../wp.ts"/>
/* tslint:disable:no-string-literal */
var ctrl;
(function (ctrl) {
    "use strict";
    var CompetitionCtrl = (function () {
        function CompetitionCtrl($q, competitor, wikipedia, metric) {
            this.$q = $q;
            this.competitor = competitor;
            this.wikipedia = wikipedia;
            this.metric = metric;
            var rm = new ctrl.RandomMetrics();
            var metricNames = rm.selectAll();
            this.companion = competitor.create(metricNames);
            var op = this.opponent = competitor.create(metricNames);
            wikipedia.getTransclusions("Template:生物分類表").then(function (pages) {
                var keys = Object.keys(pages);
                var i = Math.floor(Math.random() * keys.length);
                op.name = pages[keys[i]]["title"];
            });
        }
        CompetitionCtrl.prototype.shuffleMetrics = function () {
            var rm = new ctrl.RandomMetrics();
            var metricNames = rm.selectAll();
            this.companion.setMetrics(metricNames);
            this.opponent.setMetrics(metricNames);
        };
        CompetitionCtrl.prototype.update = function () {
            var cpn = this.companion;
            var opp = this.opponent;
            this.$q.all([
                this.companion.update(),
                this.opponent.update()
            ]).then(function () {
                cpn.score = 0;
                opp.score = 0;
                for (var i = 0; i < 3; i++) {
                    var cmetric = cpn.metricitems[i];
                    var ometric = opp.metricitems[i];
                    if (cmetric.value > ometric.value) {
                        cpn.score += 1;
                        cmetric.icon = "metric__icon--up";
                        ometric.icon = "metric__icon--down";
                    }
                    else if (cmetric.value < ometric.value) {
                        opp.score += 1;
                        cmetric.icon = "metric__icon--down";
                        ometric.icon = "metric__icon--up";
                    }
                    else {
                        cmetric.icon = "";
                        ometric.icon = "";
                    }
                }
                if (cpn.score > opp.score) {
                    cpn.finish_text = "WIN";
                    cpn.finish_style = "win";
                    opp.finish_text = "LOSE";
                    opp.finish_style = "lose";
                }
                else if (cpn.score < opp.score) {
                    cpn.finish_text = "LOSE";
                    cpn.finish_style = "lose";
                    opp.finish_text = "WIN";
                    opp.finish_style = "win";
                }
                else {
                    cpn.finish_text = "DRAW";
                    cpn.finish_style = "";
                    opp.finish_text = "DRAW";
                    opp.finish_style = "";
                }
            });
        };
        return CompetitionCtrl;
    })();
    ctrl.CompetitionCtrl = CompetitionCtrl;
})(ctrl || (ctrl = {}));
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="ctrl.ts"/>
/// <reference path="comp.ts"/>
/// <reference path="metric.ts"/>
/// <reference path="wp.ts"/>
angular.module("dosenApp", []).controller("CompetitionCtrl", ctrl.CompetitionCtrl).service("competitor", comp.Factory).service("metric", metric.Factory).service("wikipedia", wp.Wikipedia);
/// <reference path="../test_helper.d.ts"/>
describe("metric.Backlinks", function () {
    var m;
    var expect = chai.expect;
    beforeEach(function () {
        var $injector = angular.injector(["ng", "dosenApp"]);
        var wikipedia = $injector.get("wikipedia");
        m = new metric.Backlinks(wikipedia);
    });
    it("should get # of backlinks", function (done) {
        this.timeout(5000);
        m.getMetric("ペリカン").then(function (mi) {
            try {
                expect(mi).to.have.property("name").and.equal("バックリンク数");
                expect(mi).to.have.property("text").and.not.equal("NOT FOUND");
                expect(mi).to.have.property("value").and.above(1);
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });
});
/// <reference path="../test_helper.d.ts"/>
describe("metric.FamilyNameLength", function () {
    var expect = chai.expect;
    var m;
    beforeEach(function () {
        var $injector = angular.injector(["ng", "dosenApp"]);
        var wikipedia = $injector.get("wikipedia");
        m = new metric.FamilyNameLength(wikipedia);
    });
    it("should get 'Wikispecies' name", function (done) {
        this.timeout(5000);
        m.getMetric("ヒツジ").then(function (mi) {
            try {
                expect(mi).to.have.property("name").and.equal("科名長");
                expect(mi).to.have.property("text").and.equal("ウシ");
                expect(mi).to.have.property("value").and.equal(2);
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });
    it("should get some value for invalid text", function (done) {
        this.timeout(5000);
        m.getMetric("ストリング").then(function (mi) {
            try {
                expect(mi).to.have.property("value").and.equal(0);
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });
});
/// <reference path="../test_helper.d.ts"/>
describe("metric.ZoologicalNameLength", function () {
    var expect = chai.expect;
    var m;
    beforeEach(function () {
        var $injector = angular.injector(["ng", "dosenApp"]);
        var wikipedia = $injector.get("wikipedia");
        m = new metric.ZoologicalNameLength(wikipedia);
    });
    it("should get 'Wikispecies' name", function (done) {
        this.timeout(5000);
        m.getMetric("ペリカン").then(function (mi) {
            try {
                expect(mi).to.have.property("name").and.equal("学名");
                expect(mi).to.have.property("text").and.equal("Pelecanidae");
                expect(mi).to.have.property("value").and.equal(11);
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });
    it("should get 'Species' name", function (done) {
        this.timeout(5000);
        m.getMetric("ヒツジ").then(function (mi) {
            try {
                expect(mi).to.have.property("name").and.equal("学名");
                expect(mi).to.have.property("text").and.equal("Ovis aries");
                expect(mi).to.have.property("value").and.equal(10);
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });
    it("should get some value for invalid text", function (done) {
        this.timeout(5000);
        m.getMetric("ストリング").then(function (mi) {
            try {
                expect(mi).to.have.property("value").and.equal(0);
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });
});
/// <reference path="../test_helper.d.ts"/>
describe("metric", function () {
    var expect = chai.expect;
    var wikipedia;
    before(function () {
        var $injector = angular.injector(["ng", "dosenApp"]);
        wikipedia = $injector.get("wikipedia");
    });
    describe("BodyLength", function () {
        var m;
        beforeEach(function () {
            m = new metric.BodyLength(wikipedia);
        });
        it("should get a 'm' metric", function (done) {
            this.timeout(5000);
            m.getMetric("ペリカン").then(function (mi) {
                try {
                    expect(mi).to.have.property("name").and.equal("体長");
                    expect(mi).to.have.property("text").and.equal("170センチメートル");
                    expect(mi).to.have.property("value").and.equal(1.7);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        it("should get some value for invalid text", function (done) {
            this.timeout(5000);
            m.getMetric("ストリング").then(function (mi) {
                try {
                    expect(mi).to.have.property("name").and.equal("体長");
                    expect(mi).to.have.property("text");
                    expect(mi).to.have.property("value");
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
    describe("BodyWeight", function () {
        var m;
        beforeEach(function () {
            m = new metric.BodyWeight(wikipedia);
        });
        it("should get a metric", function (done) {
            this.timeout(5000);
            m.getMetric("ペリカン").then(function (mi) {
                try {
                    expect(mi).to.have.property("name").and.equal("体重");
                    expect(mi).to.have.property("text").and.equal("11キログラム");
                    expect(mi).to.have.property("value").and.equal(11);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        it("should get some value for invalid text", function (done) {
            this.timeout(5000);
            m.getMetric("ストリング").then(function (mi) {
                try {
                    expect(mi).to.have.property("name").and.equal("体重");
                    expect(mi).to.have.property("text");
                    expect(mi).to.have.property("value").and.equal(0);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
    describe("NameLength", function () {
        var m;
        beforeEach(function () {
            m = new metric.NameLength(wikipedia);
        });
        it("should get a metric for valid text", function (done) {
            this.timeout(5000);
            m.getMetric("ペリカン").then(function (mi) {
                try {
                    expect(mi).to.have.property("name").and.equal("名前長");
                    expect(mi).to.have.property("text").and.equal("ペリカン");
                    expect(mi).to.have.property("value").and.equal(4);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        it("should get some value for invalid text", function (done) {
            this.timeout(5000);
            m.getMetric("ストリング").then(function (mi) {
                try {
                    expect(mi).to.have.property("name").and.equal("名前長");
                    expect(mi).to.have.property("text");
                    expect(mi).to.have.property("value").and.equal(0);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
    describe("TaxonomyImage", function () {
        var m;
        beforeEach(function () {
            m = new metric.TaxonomyImage(wikipedia);
        });
        it("should get an image url", function (done) {
            this.timeout(5000);
            m.getMetric("ペリカン").then(function (mi) {
                try {
                    expect(mi).to.have.property("text").and.to.match(/^http/);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
});
/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getBacklinks", function () {
    var expect = chai.expect;
    var wikipedia;
    beforeEach(function () {
        var $injector = angular.injector(["ng", "dosenApp"]);
        wikipedia = $injector.get("wikipedia");
    });
    it("should get a lot of backlinks", function (done) {
        wikipedia.getBacklinks("サイ").then(function (data) {
            expect(data).to.have.length.above(3);
            done();
        });
    });
});
/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getText", function () {
    var expect = chai.expect;
    var wikipedia;
    beforeEach(function () {
        var $injector = angular.injector(["ng", "dosenApp"]);
        wikipedia = $injector.get("wikipedia");
    });
    it("should get a long text", function (done) {
        wikipedia.getText("サイ").then(function (data) {
            expect(data).to.have.length.above(300);
            done();
        });
    });
    it("should get successively", function (done) {
        var doneCount = 0;
        for (var i = 0; i < 10; i++) {
            wikipedia.getText("サイ").then(function (data) {
                expect(data).to.have.length.above(300);
                doneCount++;
                if (doneCount === 10) {
                    done();
                }
            });
        }
    });
});
/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getThumb", function () {
    var expect = chai.expect;
    var wikipedia;
    beforeEach(function () {
        var $injector = angular.injector(["ng", "dosenApp"]);
        wikipedia = $injector.get("wikipedia");
    });
    it("should get an url", function (done) {
        wikipedia.getThumb("File:White_rhinos.jpg").then(function (url) {
            expect(url).to.match(/^http/);
            done();
        });
    });
});
/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getTransclusions", function () {
    var expect = chai.expect;
    var wikipedia;
    beforeEach(function () {
        var $injector = angular.injector(["ng", "dosenApp"]);
        wikipedia = $injector.get("wikipedia");
    });
    it("should get a lot of pages", function (done) {
        wikipedia.getTransclusions("Template:生物分類表").then(function (data) {
            expect(Object.keys(data)).to.have.length.above(100);
            done();
        });
    });
    it("should get a title of pages", function (done) {
        wikipedia.getTransclusions("Template:生物分類表").then(function (data) {
            var key = Object.keys(data)[0];
            expect(data[key]).to.have.property("title");
            done();
        });
    });
});
//# sourceMappingURL=integration.js.map