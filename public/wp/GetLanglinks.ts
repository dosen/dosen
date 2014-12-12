/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="IPromisedResultArg.ts" />
/// <reference path="ILanglink.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class GetLanglinks {
    public endpoint = "//ja.wikipedia.org/w/api.php";
    public query = "?format=json&callback=JSON_CALLBACK"
    + "&action=query&prop=langlinks&lllimit=500&redirects";

    private cache: { [n: string]: ng.IPromise<ILanglink[]> } = {};

    constructor(private $http: ng.IHttpService) {
    }

    public get(title: string): ng.IPromise<ILanglink[]> {
      if (this.cache[title]) {
        return this.cache[title];
      }

      console.debug("getting from Wikipadia the langlinks of " + title);
      var promise = this.$http
      .jsonp(this.endpoint + this.query, { params: { titles: title } })
      .then(function(arg: IPromisedResultArg): ILanglink[] {
        var pages = arg.data["query"]["pages"];
        for (var k in pages) {
          if (pages.hasOwnProperty(k)) {
            console.debug("retrieved the langlinks of " + title);
            return pages[k]["langlinks"];
          }
        }
      });
      this.cache[title] = promise;
      return promise;
    }
  }
}
