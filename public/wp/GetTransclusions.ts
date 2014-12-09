/// <reference path="../typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class GetTransclusions {
    public endpoint = "//ja.wikipedia.org/w/api.php";
    public query = "?format=json&callback=JSON_CALLBACK&continue="
    + "&action=query&generator=transcludedin&prop=info&gtilimit=500";

    private cache: { [n: string]: ng.IPromise<IPages> } = {};

    constructor(private $http: ng.IHttpService) {
    }

    public get(title: string): ng.IPromise<IPages> {
      if (this.cache[title]) {
        return this.cache[title];
      }

      console.debug("getting from Wikipadia the transclusions of " + title);
      var promise = this.$http
      .jsonp(this.endpoint + this.query, { params: { titles: title } })
      .then(function(arg: IPromisedResultArg): IPages {
        console.debug("retrieved the transclusions of " + title);
        return arg.data["query"]["pages"];
      });

      this.cache[title] = promise;
      return promise;
    }
  }
}
