/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="wp/GetText.ts" />
/// <reference path="wp/GetThumb.ts" />
/// <reference path="wp/GetBacklinks.ts" />
/// <reference path="wp/GetTransclusions.ts" />
/* tslint:disable:no-string-literal */
module wp {
  "use strict";

  export class Wikipedia {
    public endpoint = "//ja.wikipedia.org/w/api.php";

    private _getText = new GetText(this.$http);
    private _getThumb = new GetThumb(this.$http);
    private _getBacklinks = new GetBacklinks(this.$http);
    private _getTransclusions = new GetTransclusions(this.$http);

    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
    }

    public getText(title: string): ng.IPromise<string> {
      return this._getText.get(title);
    }

    public getBacklinks(title: string): ng.IPromise<IBacklink[]> {
      return this._getBacklinks.get(title);
    }

    public getTransclusions(title: string): ng.IPromise<IPages> {
      return this._getTransclusions.get(title);
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
      return this._getThumb.get(title);
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
