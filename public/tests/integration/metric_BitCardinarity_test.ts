/// <reference path="../test_helper.d.ts"/>
describe("metric.BitCardinarity", function(): void {
  var expect = chai.expect;
  var m: metric.IMetric;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    var wikipedia = $injector.get("wikipedia");
    m = new metric.BitCardinarity(wikipedia);
  });

  it("should get bit cardinarity", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
    	try {
        expect(mi).to.have.property("value").and.below(1);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
