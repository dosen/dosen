/// <reference path="typings/angularjs/angular.d.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class Wikipedia {
    public endpoint = "//ja.wikipedia.org/w/api.php";

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

    public getTransclusions(title: string): ng.IPromise<IPages> {
      var $q = this.$q;
      var url = this.endpoint + "?format=json&callback=JSON_CALLBACK&continue="
        + "&action=query&generator=transcludedin&prop=info&gtilimit=500";

      console.debug("getting from Wikipadia the transclusions of " + title);
      return this.$http
        .jsonp(url, { params: { titles: title } })
        .then(function(arg: IPromisedResultArg): ng.IPromise<IPages> {
          var pages = arg.data["query"]["pages"];
          console.debug("retrieved the transclusions of " + title);
          var deferred = $q.defer();
          deferred.resolve(pages);
          return deferred.promise;
        });
    }

    public getCategoryMembers(cmtitle: string): ng.IPromise<IPage[]> {
      var $q = this.$q;
      var url = this.endpoint + "?format=json&callback=JSON_CALLBACK&continue="
        + "&action=query&list=categorymembers&cmlimit=500";

      console.debug("getting from Wikipadia the category members of " + cmtitle);
      return this.$http
        .jsonp(url, { params: { cmtitle: cmtitle } })
        .then(function(arg: IPromisedResultArg): ng.IPromise<IPage[]> {
          var pages = arg.data["query"]["categorymembers"];
          console.debug("retrieved the category members of " + cmtitle);
          var deferred = $q.defer();
          deferred.resolve(pages);
          return deferred.promise;
        });
    }

    public getImage(title: string): ng.IPromise<string> {
      var url = this.endpoint + "?format=json&callback=JSON_CALLBACK&continue="
      + "&action=query&prop=imageinfo&iiprop=url";

      console.debug("getting from Wikipadia the image of " + title);
      return this.$http
      .jsonp(url, { params: { titles: title } })
      .then(function(arg: IPromisedResultArg): string {
        var imageinfo = arg.data["query"]["pages"]["-1"]["imageinfo"];
        console.debug("retrieved the image of " + title);
        return imageinfo[0]["url"];
      });
    }

    public getThumb(title: string): ng.IPromise<string> {
      var url = this.endpoint + "?format=json&callback=JSON_CALLBACK&continue="
      + "&action=query&prop=imageinfo&iiprop=url&iiurlheight=320";

      console.debug("getting from Wikipadia the image of " + title);
      return this.$http
      .jsonp(url, { params: { titles: title } })
      .then(function(arg: IPromisedResultArg): string {
        var imageinfo = arg.data["query"]["pages"]["-1"]["imageinfo"];
        console.debug("retrieved the image of " + title);
        return imageinfo[0]["thumburl"];
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
    pages?: IPages;
    categorymembers?: IPage[];
    backlinks?: IBacklink[];
  }

  export interface IPages {
    [n: string]: IPage;
  }

  export interface IPage {
    title?: string;
    revisions?: IRevision[];
    imageinfo?: IImageInfo[];
  }

  export interface IRevision {
    "*": string;
  }

  export interface IBacklink {
    pageid: number;
    ns: number;
    title: string;
  }

  export interface IImageInfo {
    url?: string;
    thumburl?: string;
  }
}
