/// <reference path="../typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class GetText {
    public endpoint = "//ja.wikipedia.org/w/api.php";

    constructor(private $http: ng.IHttpService) {
    }

    public get(title: string): ng.IPromise<string> {
      var url = this.endpoint + "?format=json&callback=JSON_CALLBACK"
        + "&action=query&prop=revisions&rvprop=content&redirects";

      console.debug("getting from Wikipadia the text of " + title);
      return this.$http
      .jsonp(url, { params: { titles: title } })
      .then(function(arg: IPromisedResultArg): string {
        var pages = arg.data["query"]["pages"];
        for (var k in pages) {
          if (pages.hasOwnProperty(k)) {
            console.debug("retrieved the text of " + title);
            return pages[k]["revisions"][0]["*"];
          }
        }
      });
    }
  }
}
