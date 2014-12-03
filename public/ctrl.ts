/// <reference path="comp.ts"/>
/// <reference path="wp.ts"/>
/* tslint:disable:no-string-literal */
module ctrl {
  "use strict";

  export class CompetitionCtrl {
    public companion: comp.ICompetitor;
    public opponent: comp.ICompetitor;

    constructor(
      private $q: ng.IQService,
      public competitor: comp.Factory,
      public wikipedia: wp.Wikipedia,
      public metric: metric.Factory
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

    public update(): void {
      var cpn = this.companion;
      var opp = this.opponent;
      this.$q.all([
        this.companion.update(),
        this.opponent.update()
      ]).then(function(): void {
        cpn.score = 0;
        opp.score = 0;
        for (var i = 0; i < 3; i++) {
          var cmetric = cpn.metricitems[i];
          var ometric = opp.metricitems[i];
          if (cmetric.value > ometric.value) {
            cpn.score += 1;
            cmetric.icon = "metric__icon--up";
            ometric.icon = "metric__icon--down";
          } else if (cmetric.value < ometric.value) {
            opp.score += 1;
            cmetric.icon = "metric__icon--down";
            ometric.icon = "metric__icon--up";
          } else {
            cmetric.icon = "";
            ometric.icon = "";
          }
        }

        if (cpn.score > opp.score) {
          cpn.finish_text = "WIN";
          cpn.finish_style = "win";
          opp.finish_text = "LOSE";
          opp.finish_style = "lose";
        } else if (cpn.score < opp.score) {
          cpn.finish_text = "LOSE";
          cpn.finish_style = "lose";
          opp.finish_text = "WIN";
          opp.finish_style = "win";
        } else {
          cpn.finish_text = "DRAW";
          cpn.finish_style = "";
          opp.finish_text = "DRAW";
          opp.finish_style = "";
        }
      });
    }
  }
}
