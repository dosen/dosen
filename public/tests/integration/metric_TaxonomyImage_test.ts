/// <reference path="../test_helper.d.ts"/>
describe("metric.TaxonomyImage", function(): void {
  var expect = chai.expect;
  var m: metric.IMetric;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    var wikipedia = $injector.get("wikipedia");
    m = new metric.TaxonomyImage(wikipedia);
  });

  it("should get an image url", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
      try {
        expect(mi).to.have.property("text").and.to.match(/^http/);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
