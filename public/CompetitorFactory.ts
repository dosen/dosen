/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="Competitor.ts" />
/// <reference path="Extractor.ts" />
/// <reference path="Wikipedia.ts" />

class CompetitorFactory {
  constructor(
    private extractor: Extractor,
    private wikipedia: Wikipedia
  ) {
  }

  public create(): Competitor {
    return new Competitor(this.extractor, this.wikipedia);
  }
}

angular.module('dosenApp').service('competitorfactory', CompetitorFactory);
