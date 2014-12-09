/// <reference path="../typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class GetBacklinks {
    public endpoint = "//ja.wikipedia.org/w/api.php";
    public query = "?format=json&callback=JSON_CALLBACK&continue="
    + "&action=query&prop=imageinfo&iiprop=url&iiurlheight=320";

    private cache: { [n: string]: ng.IPromise<IBacklink[]> } = {};

    constructor(private $http: ng.IHttpService) {
    }

    public get(title: string): ng.IPromise<IBacklink[]> {
      if (this.cache[title]) {
        return this.cache[title];
      }

      var url = this.endpoint + "?format=json&callback=JSON_CALLBACK"
        + "&action=query&list=backlinks&bllimit=500";

      console.debug("getting from Wikipadia the backlinks of " + title);
      var promise = this.$http
      .jsonp(url, { params: { bltitle: title } })
      .then(function(arg: IPromisedResultArg): IBacklink[] {
        console.debug("retrieved the backlinks of " + title);
        return arg.data["query"]["backlinks"];
      });

      this.cache[title] = promise;
      return promise;
    }
  }
}
