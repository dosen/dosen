/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia#getText", function(): void {
  var expect = chai.expect;
  var wikipedia: wp.Wikipedia;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    wikipedia = $injector.get("wikipedia");
  });

  it("should get a long text", function(done: MochaDone): void {
    wikipedia.getText("サイ").then(function(data: string): void {
      expect(data).to.have.length.above(300);
      done();
    });
  });

  it("should get successively", function(done: MochaDone): void {
    var doneCount = 0;
    for (var i = 0; i < 10; i++) {
      wikipedia.getText("サイ").then(function(data: string): void {
        expect(data).to.have.length.above(300);
        doneCount++;
        if (doneCount === 10) {
          done();
        }
      });
    }
  });
});
