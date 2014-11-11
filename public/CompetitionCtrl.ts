/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="CompetitorFactory.ts" />
/// <reference path="Extractor.ts" />
/// <reference path="ICompetitor.ts" />
/// <reference path="IMetricItem.ts" />
/// <reference path="Wikipedia.ts" />

class CompetitionCtrl {
  public companion: ICompetitor;
  public opponent: ICompetitor;

  constructor(
    public wikipedia: Wikipedia,
    public extractor: Extractor,
    public competitorfactory: CompetitorFactory
  ) {
    this.companion = competitorfactory.create();
    this.opponent = competitorfactory.create();
  }
}

var dosenApp = angular
  .module("dosenApp", [])
  .controller("CompetitionCtrl", CompetitionCtrl);
