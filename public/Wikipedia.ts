/// <reference path="typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
class Wikipedia {
  public endpoint = "http://ja.wikipedia.org/w/api.php";

  constructor(
    private $http: ng.IHttpService,
    private $q: ng.IQService
  ) {
  }

  public getText(title: string): ng.IPromise<string> {
    var $q = this.$q;
    var params = {
      action: "query", prop: "revisions", rvprop: "content",
      titles: title, redirects: true,
      format: "json", callback: "JSON_CALLBACK"
    };

    console.debug("getting from Wikipadia the text of " + title);
    return this.$http
      .jsonp(this.endpoint, {params: params})
      .then(function(arg: ng.IHttpPromiseCallbackArg<IWpResult>): ng.IPromise<string> {
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

  public getBacklinks(title: string): ng.IPromise<IWpBacklink[]> {
    var $q = this.$q;
    console.debug("getting from Wikipadia the backlinks of " + title);
    return this.$http.jsonp(this.endpoint, {
      params: {
        action: "query", list: "backlinks",
        bltitle: title, bllimit: 500,
        format: "json", callback: "JSON_CALLBACK"
      }
    }).then(function(arg: ng.IHttpPromiseCallbackArg<IWpResult>): ng.IPromise<IWpBacklink[]> {
      var backlinks = arg.data["query"]["backlinks"];

      console.debug("retrieved the backlinks of " + title);
      var deferred = $q.defer();
      deferred.resolve(backlinks);
      return deferred.promise;
    });
  }
}

interface IWpResult {
  query: IWpQuery;
}

interface IWpQuery {
  pages?: {[n: string]: IWpPage};
  backlinks: IWpBacklink[];
}

interface IWpPage {
  revisions: IWpRevision[];
}

interface IWpRevision {
  "*": string;
}

interface IWpBacklink {
  pageid: number;
  ns: number;
  title: string;
}

angular.module("dosenApp").service("wikipedia", Wikipedia);
