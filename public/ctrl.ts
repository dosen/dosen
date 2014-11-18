/// <reference path="comp.ts"/>
/// <reference path="wp.ts"/>
/* tslint:disable:no-string-literal */
module ctrl {
  "use strict";

  export class CompetitionCtrl {
    public companion: comp.ICompetitor;
    public opponent: comp.ICompetitor;

    constructor(
      public competitor: comp.Factory,
      public wikipedia: wp.Wikipedia
    ) {
      this.companion = competitor.create();
      var op = this.opponent = competitor.create();
      wikipedia
      .getTransclusions("Template:生物分類表")
      .then(function(pages: wp.IPages): void {
        var keys = Object.keys(pages);
        var i = Math.floor(Math.random() * keys.length);
        op.name = pages[keys[i]]["title"];
      });
    }
  }
}
