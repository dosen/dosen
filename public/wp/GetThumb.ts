/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="IPromisedResultArg.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class GetThumb {
    public endpoint = "//ja.wikipedia.org/w/api.php";
    public query = "?format=json&callback=JSON_CALLBACK&continue="
    + "&action=query&prop=imageinfo&iiprop=url&iiurlheight=320";

    private cache: { [n: string]: ng.IPromise<string> } = {};

    constructor(private $http: ng.IHttpService) {
    }

    public get(title: string): ng.IPromise<string> {
      if (this.cache[title]) {
        return this.cache[title];
      }

      console.debug("getting from Wikipadia the thumbnail of " + title);
      var promise = this.$http
      .jsonp(this.endpoint + this.query, { params: { titles: title } })
      .then(function(arg: IPromisedResultArg): string {
        var imageinfo = arg.data["query"]["pages"]["-1"]["imageinfo"];
        console.debug("retrieved the thumbnail of " + title);
        return imageinfo[0]["thumburl"];
      });

      this.cache[title] = promise;
      return promise;
    }
  }
}
