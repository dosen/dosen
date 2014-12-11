/// <reference path="../wp.ts"/>
/// <reference path="IMetric.ts"/>
/// <reference path="Backlinks.ts"/>
/// <reference path="BodyLength.ts"/>
/// <reference path="BodyWeight.ts"/>
/// <reference path="NameLength.ts"/>
/// <reference path="TaxonomyImage.ts"/>
/// <reference path="ZoologicalNameLength.ts"/>
/// <reference path="FamilyNameLength.ts"/>
/// <reference path="Punctuations.ts"/>
/// <reference path="BitCardinarity.ts"/>
/// <reference path="ByteCount.ts"/>
module metric {
  "use strict";

  export class Factory {
    constructor(private wikipedia: wp.Wikipedia) {
    }

    public create(name: string): IMetric {
      switch (name) {
        case "Backlinks":
          return new Backlinks(this.wikipedia);
        case "BodyLength":
          return new BodyLength(this.wikipedia);
        case "BodyWeight":
          return new BodyWeight(this.wikipedia);
        case "NameLength":
          return new NameLength(this.wikipedia);
        case "TaxonomyImage":
          return new TaxonomyImage(this.wikipedia);
        case "ZoologicalNameLength":
          return new ZoologicalNameLength(this.wikipedia);
        case "FamilyNameLength":
          return new FamilyNameLength(this.wikipedia);
        case "Punctuations":
          return new Punctuations(this.wikipedia);
        case "BitCardinarity":
          return new BitCardinarity(this.wikipedia);
        case "ByteCount":
          return new ByteCount(this.wikipedia);
      }
    }

    public createAll(names: string[]): IMetric[] {
      var array: IMetric[] = [];
      for (var i = 0; i < names.length; i++) {
        array.push(this.create(names[i]));
      }
      return array;
    }
  }
}
