/// <reference path="../test_helper.d.ts"/>
describe("Extractor", function(): void {
  var expect = chai.expect;
  var extractor: Extractor;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    extractor = $injector.get("extractor");
  });

  describe("#bodyLength", function(): void {
    it("should get a 'm' metric", (): void => {
      var text = "a 10m b";
      var metric = extractor.bodyLength(text);
      expect(metric).to.have.property("name").and.equal("体長");
      expect(metric).to.have.property("text").and.equal("10m");
      expect(metric).to.have.property("value").and.equal(10);
    });
  });

  describe("#bodyWeight", function(): void {
    it("should get a gram metric", (): void => {
      var text = "10g";
      var metric = extractor.bodyWeight(text);
      expect(metric).to.have.property("name").and.equal("体重");
      expect(metric).to.have.property("text").and.equal("10g");
      expect(metric).to.have.property("value").and.equal(10e-3);
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
  });

  describe("#recBodyWeight", function(): void {
    it("should get a gram metric", (): void => {
      var text = "10g";
      var metric = extractor.recBodyWeight(text);
      expect(metric).to.have.property("name").and.equal("1/体重");
      expect(metric).to.have.property("text").and.equal("10g");
      expect(metric).to.have.property("value").and.equal(1 / 10e-3);
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
  });

  describe("#recNameLength", function(): void {
    it("should get a metric for valid text", (): void => {
      var text = "a\n名称 = ナマエ不要\nb";
      var metric = extractor.recNameLength(text);
      expect(metric).to.have.property("name").and.equal("1/名前長");
      expect(metric).to.have.property("text").and.equal("ナマエ");
      expect(metric).to.have.property("value").and.equal(1 / 3);
    });
  });
});
