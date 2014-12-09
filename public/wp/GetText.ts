/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="IPromisedResultArg.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class GetText {
    public endpoint = "//ja.wikipedia.org/w/api.php";
    public query = "?format=json&callback=JSON_CALLBACK"
    + "&action=query&prop=revisions&rvprop=content&redirects";

    private cache: { [n: string]: ng.IPromise<string> } = {};

    constructor(private $http: ng.IHttpService) {
    }

    public get(title: string): ng.IPromise<string> {
      if (this.cache[title]) {
        return this.cache[title];
      }

      console.debug("getting from Wikipadia the text of " + title);
      var promise = this.$http
      .jsonp(this.endpoint + this.query, { params: { titles: title } })
      .then(function(arg: IPromisedResultArg): string {
        var pages = arg.data["query"]["pages"];
        for (var k in pages) {
          if (pages.hasOwnProperty(k)) {
            console.debug("retrieved the text of " + title);
            return pages[k]["revisions"][0]["*"];
          }
        }
      });
      this.cache[title] = promise;
      return promise;
    }
  }
}
