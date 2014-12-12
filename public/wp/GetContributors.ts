/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="IPromisedResultArg.ts" />
/// <reference path="IUser.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class GetContributors {
    public endpoint = "//ja.wikipedia.org/w/api.php";
    public query = "?format=json&callback=JSON_CALLBACK"
    + "&action=query&prop=contributors&pclimit=500&redirects";

    private cache: { [n: string]: ng.IPromise<IUser[]> } = {};

    constructor(private $http: ng.IHttpService) {
    }

    public get(title: string): ng.IPromise<IUser[]> {
      if (this.cache[title]) {
        return this.cache[title];
      }

      console.debug("getting from Wikipadia the contributors of " + title);
      var promise = this.$http
      .jsonp(this.endpoint + this.query, { params: { titles: title } })
      .then(function(arg: IPromisedResultArg): IUser[] {
        var pages = arg.data["query"]["pages"];
        for (var k in pages) {
          if (pages.hasOwnProperty(k)) {
            console.debug("retrieved the contributors of " + title);
            return pages[k]["contributors"];
          }
        }
      });
      this.cache[title] = promise;
      return promise;
    }
  }
}
