/// <reference path="../test_helper.d.ts"/>
describe("metric", function(): void {
  var expect = chai.expect;
  var wikipedia: wp.Wikipedia;

  before(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    wikipedia = $injector.get("wikipedia");
  });

  describe("BodyLength", function(): void {
    var m: metric.IMetric;

    beforeEach(function(): void {
      m = new metric.BodyLength(wikipedia);
    });

    it("should get a 'm' metric", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
        expect(mi).to.have.property("name").and.equal("体長");
        expect(mi).to.have.property("text").and.equal("170センチメートル");
        expect(mi).to.have.property("value").and.equal(1.7);
        done();
      });
    });

    it("should get some value for invalid text", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("JavaScript").then(function(mi: metric.IMetricItem): void {
        expect(mi).to.have.property("name").and.equal("体長");
        expect(mi).to.have.property("text");
        expect(mi).to.have.property("value");
        done();
      });
    });
  });

  /*
  describe("#bodyWeight", function(): void {
    it("should get a gram metric", (): void => {
      var text = "10g";
      var metric = extractor.bodyWeight(text);
      expect(metric).to.have.property("name").and.equal("体重");
      expect(metric).to.have.property("text").and.equal("10g");
      expect(metric).to.have.property("value").and.equal(10e-3);
    });

    it("should get some value for invalid text", (): void => {
      var text = "a b";
      var metric = extractor.bodyWeight(text);
      expect(metric).to.have.property("name").and.equal("体重");
      expect(metric).to.have.property("text");
      expect(metric).to.have.property("value");
    });
  });

  describe("#recBodyLength", function(): void {
    it("should get a 'm' metric", (): void => {
      var text = "a 10m b";
      var metric = extractor.recBodyLength(text);
      expect(metric).to.have.property("name").and.equal("1/体長");
      expect(metric).to.have.property("text").and.equal("10m");
      expect(metric).to.have.property("value").and.equal(1 / 10);
    });

    it("should get some value for invalid text", (): void => {
      var text = "a b";
      var metric = extractor.recBodyLength(text);
      expect(metric).to.have.property("name").and.equal("1/体長");
      expect(metric).to.have.property("text");
      expect(metric).to.have.property("value").and.above(1e30);
    });
  });

  describe("#recBodyWeight", function(): void {
    it("should get a gram metric", (): void => {
      var text = "10g";
      var metric = extractor.recBodyWeight(text);
      expect(metric).to.have.property("name").and.equal("1/体重");
      expect(metric).to.have.property("text").and.equal("10g");
      expect(metric).to.have.property("value").and.above(1 / 10);
    });

    it("should get some value for invalid text", (): void => {
      var text = "a b";
      var metric = extractor.recBodyWeight(text);
      expect(metric).to.have.property("name").and.equal("1/体重");
      expect(metric).to.have.property("text");
      expect(metric).to.have.property("value").and.above(1e30);
    });
  });

  describe("#nameLength", function(): void {
    it("should get a metric for valid text", (): void => {
      var text = "a\n名称 = ナマエ不要\nb";
      var metric = extractor.nameLength(text);
      expect(metric).to.have.property("name").and.equal("名前長");
      expect(metric).to.have.property("text").and.equal("ナマエ");
      expect(metric).to.have.property("value").and.equal(3);
    });

    it("should get some value for invalid text", (): void => {
      var text = "a b";
      var metric = extractor.nameLength(text);
      expect(metric).to.have.property("name").and.equal("名前長");
      expect(metric).to.have.property("text");
      expect(metric).to.have.property("value").and.equal(0);
    });
  });

  describe("#recNameLength", function(): void {
    it("should get a metric for valid text", (): void => {
      var text = "a\n名称 = ナマエ不要\nb";
      var metric = extractor.recNameLength(text);
      expect(metric).to.have.property("name").and.equal("1/名前長");
      expect(metric).to.have.property("text").and.equal("ナマエ");
      expect(metric).to.have.property("value").and.equal(1 / 3);
    });

    it("should get some value for invalid text", (): void => {
      var text = "a b";
      var metric = extractor.recNameLength(text);
      expect(metric).to.have.property("name").and.equal("1/名前長");
      expect(metric).to.have.property("text");
      expect(metric).to.have.property("value").and.above(1e30);
    });
  });
  */
});
