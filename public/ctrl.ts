/// <reference path="comp.ts"/>
module ctrl {
  "use strict";

  export class CompetitionCtrl {
    public companion: comp.ICompetitor;
    public opponent: comp.ICompetitor;

    constructor(
      public competitor: comp.Factory
    ) {
      this.companion = competitor.create();
      this.opponent = competitor.create();
    }
  }
}
