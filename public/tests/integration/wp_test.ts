/// <reference path="../test_helper.d.ts"/>
describe("wp.Wikipedia", function(): void {
  var expect = chai.expect;
  var wikipedia: wp.Wikipedia;

  beforeEach(function(): void {
    var $injector = angular.injector(["ng", "dosenApp"]);
    wikipedia = $injector.get("wikipedia");
  });

  describe("#getText", function(): void {
    it("should get a long text", function(done: MochaDone): void {
      wikipedia
      .getText("サイ")
      .then(function(data: string): void {
        expect(data).to.have.length.above(300);
        done();
      });
    });
  });

  describe("#getCategoryMembers", function(): void {
    var pages: wp.IPage[];

    before(function(done: MochaDone): void {
      this.timeout(10000);
      wikipedia
      .getCategoryMembers("Category:動物")
      .then(function(data: wp.IPage[]): void {
        pages = data;
        done();
      });
    });

    it("should get a lot of pages", function(): void {
      expect(pages).to.have.length.above(50);
    });

    it("should get a title of pages", function(): void {
      expect(pages[0]).to.have.property("title");
    });
  });
});
