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
      	try {
          expect(mi).to.have.property("name").and.equal("体長");
          expect(mi).to.have.property("text").and.equal("170センチメートル");
          expect(mi).to.have.property("value").and.equal(1.7);
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it("should get some value for invalid text", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("ストリング").then(function(mi: metric.IMetricItem): void {
      	try {
          expect(mi).to.have.property("name").and.equal("体長");
          expect(mi).to.have.property("text");
          expect(mi).to.have.property("value");
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  describe("BodyWeight", function(): void {
    var m: metric.IMetric;

    beforeEach(function(): void {
      m = new metric.BodyWeight(wikipedia);
    });

    it("should get a metric", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
      	try {
          expect(mi).to.have.property("name").and.equal("体重");
          expect(mi).to.have.property("text").and.equal("11キログラム");
          expect(mi).to.have.property("value").and.equal(11);
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it("should get some value for invalid text", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("ストリング").then(function(mi: metric.IMetricItem): void {
      	try {
          expect(mi).to.have.property("name").and.equal("体重");
          expect(mi).to.have.property("text");
          expect(mi).to.have.property("value").and.equal(0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  describe("NameLength", function(): void {
    var m: metric.IMetric;

    beforeEach(function(): void {
      m = new metric.NameLength(wikipedia);
    });

    it("should get a metric for valid text", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
      	try {
          expect(mi).to.have.property("name").and.equal("名前長");
          expect(mi).to.have.property("text").and.equal("ペリカン");
          expect(mi).to.have.property("value").and.equal(4);
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it("should get some value for invalid text", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("ストリング").then(function(mi: metric.IMetricItem): void {
      	try {
          expect(mi).to.have.property("name").and.equal("名前長");
          expect(mi).to.have.property("text");
          expect(mi).to.have.property("value").and.equal(0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  describe("Backlinks", function(): void {
    var m: metric.IMetric;

    beforeEach(function(): void {
      m = new metric.Backlinks(wikipedia);
    });

    it("should get # of backlinks", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
        try {
          expect(mi).to.have.property("name").and.equal("バックリンク数");
          expect(mi).to.have.property("text");
          expect(mi).to.have.property("value").and.above(0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  describe("TaxonomyImage", function(): void {
    var m: metric.IMetric;

    beforeEach(function(): void {
      m = new metric.TaxonomyImage(wikipedia);
    });

    it("should get an image url", function(done: MochaDone): void {
      this.timeout(5000);
      m.getMetric("ペリカン").then(function(mi: metric.IMetricItem): void {
        try {
          expect(mi).to.have.property("text").and.to.match(/^http/);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
