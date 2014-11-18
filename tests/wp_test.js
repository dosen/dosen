describe("wp.Wikipedia", function() {
  var wikipedia;

  beforeEach(function () {
    var $injector = angular.injector(["ng", "dosenApp"]);
    wikipedia = $injector.get("wikipedia");
  });

  describe("#getText", function() {
    it("should get a long text", function(done) {
      wikipedia.getText("サイ").then(function(data) {
        expect(data).to.have.length.above(300);
        done();
      });
    });
  });

  describe("#getTransclusions", function() {
    var pages;
    this.timeout(10000);

    before(function(done) {
      wikipedia.getTransclusions("Template:生物分類表").then(function(data) {
        pages = data;
        done();
      });
    });

    it("should get a lot of pages", function() {
      expect(Object.keys(pages)).to.have.length.above(100);
    });

    it("should get a title of pages", function() {
      var key = Object.keys(pages)[0];
      expect(pages[key]).to.have.property("title");
    });
  });

  describe("#getCategoryMembers", function() {
    var pages;
    this.timeout(10000);

    before(function(done) {
      wikipedia.getCategoryMembers("Category:動物").then(function(data) {
        pages = data;
        done();
      });
    });

    it("should get a lot of pages", function() {
      expect(pages).to.have.length.above(50);
    });

    it("should get a title of pages", function() {
      expect(pages[0]).to.have.property("title");
    });
  });
});
