/// <reference path="../test_helper.d.ts"/>
describe("metric.BodyLength", function(): void {
  var expect = chai.expect;
  var m: metric.IMetric;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    var wikipedia = $injector.get("wikipedia");
    m = new metric.BodyLength(wikipedia);
  });

  it("should get a 'm' metric", function(done: MochaDone): void {
    this.timeout(5000);
    m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
    	try {
        expect(mi).to.have.property("name").and.equal("体長");
        expect(mi).to.have.property("text").and.equal("170センチメートル");
        expect(mi).to.have.property("value").and.equal(1.7);
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
        expect(mi).to.have.property("name").and.equal("体長");
        expect(mi).to.have.property("text");
        expect(mi).to.have.property("value");
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
