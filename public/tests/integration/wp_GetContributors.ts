/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getContributors", function(): void {
  var expect = chai.expect;
  var wikipedia: wp.Wikipedia;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    wikipedia = $injector.get("wikipedia");
  });

  it("should get a contributors", function(done: MochaDone): void {
    wikipedia.getContributors("サイ").then(function(data: wp.IUser[]): void {
      expect(data).to.have.length.above(1);
      done();
    });
  });
});
