/// <reference path="../test_helper.d.ts"/>
describe("metric.FamilyNameLength", function(): void {
  var expect = chai.expect;
  var m: metric.IMetric;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    var wikipedia = $injector.get("wikipedia");
    m = new metric.FamilyNameLength(wikipedia);
  });

  it("should get 'Wikispecies' name", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ヒツジ").then(function(mi: metric.IMetricItem): void {
    	try {
        expect(mi).to.have.property("name").and.equal("科名長");
        expect(mi).to.have.property("text").and.equal("ウシ");
        expect(mi).to.have.property("value").and.equal(2);
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
