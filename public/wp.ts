/// <reference path="typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class Wikipedia {
    public endpoint = "http://ja.wikipedia.org/w/api.php";

    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
    }

    public getText(title: string): ng.IPromise<string> {
      var $q = this.$q;
      var url = this.endpoint + "?format=json&callback=JSON_CALLBACK"
        + "&action=query&prop=revisions&rvprop=content&redirects";

      console.debug("getting from Wikipadia the text of " + title);
      return this.$http
        .jsonp(url, { params: { titles: title } })
        .then(function(arg: IPromisedResultArg): ng.IPromise<string> {
          var pages = arg.data["query"]["pages"];
          for (var k in pages) {
            if (pages.hasOwnProperty(k)) {
              var text = pages[k]["revisions"][0]["*"];
              console.debug("retrieved the text of " + title);
              var deferred = $q.defer();
              deferred.resolve(text);
              return deferred.promise;
            }
          }
        });
    }

    public getBacklinks(title: string): ng.IPromise<IBacklink[]> {
      var $q = this.$q;
      var url = this.endpoint + "?format=json&callback=JSON_CALLBACK"
        + "&action=query&list=backlinks&bllimit=500";

      console.debug("getting from Wikipadia the backlinks of " + title);
      return this.$http
        .jsonp(url, { params: { bltitle: title } })
        .then(function(arg: IPromisedResultArg): ng.IPromise<IBacklink[]> {
          var backlinks = arg.data["query"]["backlinks"];
          console.debug("retrieved the backlinks of " + title);
          var deferred = $q.defer();
          deferred.resolve(backlinks);
          return deferred.promise;
        });
    }
  }

  export interface IPromisedResultArg
    extends ng.IHttpPromiseCallbackArg<IResult> {
  }

  export interface IResult {
    query: IQuery;
  }

  export interface IQuery {
    pages?: {[n: string]: IPage};
    backlinks?: IBacklink[];
  }

  export interface IPage {
    revisions: IRevision[];
  }

  export interface IRevision {
    "*": string;
  }

  export interface IBacklink {
    pageid: number;
    ns: number;
    title: string;
  }
}
