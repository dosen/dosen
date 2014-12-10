/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getThumb", function(): void {
  var expect = chai.expect;
  var wikipedia: wp.Wikipedia;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    wikipedia = $injector.get("wikipedia");
  });

  it("should get an url", function(done: MochaDone): void {
    wikipedia
    .getThumb("File:White_rhinos.jpg")
    .then(function(url: string): void {
      expect(url).to.match(/^http/);
      done();
    });
  });
});

