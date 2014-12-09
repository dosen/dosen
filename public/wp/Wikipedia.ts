/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="GetText.ts" />
/// <reference path="GetThumb.ts" />
/// <reference path="GetBacklinks.ts" />
/// <reference path="GetTransclusions.ts" />
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

    public getThumb(title: string): ng.IPromise<string> {
      return this._getThumb.get(title);
    }
  }
}
