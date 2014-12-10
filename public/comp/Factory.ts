/// <reference path="../comp.ts"/>
module comp {
  "use strict";

  export class Factory {
    constructor(
      private $q: ng.IQService,
      private metric: metric.Factory,
      private wikipedia: wp.Wikipedia
    ) {
    }

    public create(metricNames: string[]): Competitor {
      return new Competitor(this.$q, this.metric, this.wikipedia, metricNames);
    }
  }
}
