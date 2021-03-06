/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getBacklinks", function(): void {
  var expect = chai.expect;
  var wikipedia: wp.Wikipedia;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    wikipedia = $injector.get("wikipedia");
  });

  it("should get a lot of backlinks", function(done: MochaDone): void {
    wikipedia.getBacklinks("サイ").then(function(data: wp.IBacklink[]): void {
      expect(data).to.have.length.above(3);
      done();
    });
  });
});
