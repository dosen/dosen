/// <reference path="../test_helper.d.ts"/>
describe("metric.ZoologicalNameLength", function(): void {
  var expect = chai.expect;
  var m: metric.IMetric;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    var wikipedia = $injector.get("wikipedia");
    m = new metric.ZoologicalNameLength(wikipedia);
  });

  it("should get 'Wikispecies' name", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
    	try {
        expect(mi).to.have.property("name").and.equal("学名");
        expect(mi).to.have.property("text").and.equal("Pelecanidae");
        expect(mi).to.have.property("value").and.equal(11);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it("should get 'Species' name", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ヒツジ").then(function(mi: metric.IMetricItem): void {
    	try {
        expect(mi).to.have.property("name").and.equal("学名");
        expect(mi).to.have.property("text").and.equal("Ovis aries");
        expect(mi).to.have.property("value").and.equal(10);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it("should get 'Taxo' name", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ハネジネズミ").then(function(mi: metric.IMetricItem): void {
    	try {
        expect(mi).to.have.property("name").and.equal("学名");
        expect(mi).to.have.property("text").and.equal("Macroscelidea");
        expect(mi).to.have.property("value").and.equal(13);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it("should get some value for invalid text", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ストリング").then(function(mi: metric.IMetricItem): void {
    	try {
        expect(mi).to.have.property("value").and.equal(0);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
