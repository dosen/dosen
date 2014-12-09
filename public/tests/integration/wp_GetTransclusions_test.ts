/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getTransclusions", function(): void {
  var expect = chai.expect;
  var wikipedia: wp.Wikipedia;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    wikipedia = $injector.get("wikipedia");
  });

  it("should get a lot of pages", function(done: MochaDone): void {
    wikipedia
    .getTransclusions("Template:生物分類表")
    .then(function(data: wp.IPages): void {
      expect(Object.keys(data)).to.have.length.above(100);
      done();
    });
  });

  it("should get a title of pages", function(done: MochaDone): void {
    wikipedia
    .getTransclusions("Template:生物分類表")
    .then(function(data: wp.IPages): void {
      var key = Object.keys(data)[0];
      expect(data[key]).to.have.property("title");
      done();
    });
  });
});
