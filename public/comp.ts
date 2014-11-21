/// <reference path="Extractor.ts"/>
/// <reference path="wp.ts"/>
module comp {
  "use strict";

  export interface ICompetitor {
    name: string;
    metrics: IMetricItem[];
    score: number;
    finish_style: string;
    finish_text: string;

    update(): ng.IPromise<any[]>;
  }

  export interface IMetricItem {
    name: string;
    text: string;
    value: number;
    icon?: string;
  }

  export class Competitor implements ICompetitor {
    public name: string;
    public metrics: IMetricItem[];
    public score: number;
    public finish_style: string;
    public finish_text: string;

    constructor(
      private $q: ng.IQService,
      private extractor: Extractor,
      private wikipedia: wp.Wikipedia
    ) {
      this.metrics = [
        {name: "metric1", text: "1", value: 1, icon: ""},
        {name: "metric2", text: "2", value: 2, icon: ""},
        {name: "metric3", text: "3", value: 3, icon: ""}
      ];
    }

    public update(): ng.IPromise<any[]> {
      var metrics = this.metrics;
      var extractor = this.extractor;
      return this.$q.all([
        this.wikipedia
        .getText(this.name)
        .then(function(text: string): void {
          var m0 = extractor.bodyLength(text);
          metrics[0].name = m0.name;
          metrics[0].text = m0.text;
          metrics[0].value = m0.value;
          metrics[0].icon = "metric__icon--up";
          var m1 = extractor.bodyWeight(text);
          metrics[1].name = m1.name;
          metrics[1].text = m1.text;
          metrics[1].value = m1.value;
          metrics[1].icon = "metric__icon--down";
        }),
        this.wikipedia.getBacklinks(this.name)
        .then(function(backlinks: wp.IBacklink[]): void {
          metrics[2].name = "backlinks";
          metrics[2].text = backlinks.length + "ページ";
          metrics[2].value = backlinks.length;
          metrics[2].icon = "metric__icon--down";
        })
      ]);
    }
  }

  export class Factory {
    constructor(
      private $q: ng.IQService,
      private extractor: Extractor,
      private wikipedia: wp.Wikipedia
    ) {
    }

    public create(): Competitor {
      return new Competitor(this.$q, this.extractor, this.wikipedia);
    }
  }
}
