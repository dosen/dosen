/// <reference path="../test_helper.d.ts"/>
describe("metric.Langlinks", function(): void {
  var m: metric.IMetric;
  var expect = chai.expect;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    var wikipedia = $injector.get("wikipedia");
    m = new metric.Langlinks(wikipedia);
  });

  it("should get # of langlinks", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
      try {
        expect(mi).to.have.property("value").and.above(1);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
