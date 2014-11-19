/// <reference path="../test_helper.d.ts"/>
describe("Extractor", function(): void {
  var expect = chai.expect;
  var extractor: Extractor;

  beforeEach((): void => {
    var $injector = angular.injector(["ng", "dosenApp"]);
    extractor = $injector.get("extractor");
  });

  describe("#nameLength", (): void => {
    it("should get a metric for valid text", (): void => {
      var text = "a\n名称 = ナマエ不要\nb";
      var metric = extractor.nameLength(text);
      expect(metric).to.have.property("name").equal("名前長");
    });
  });
});
