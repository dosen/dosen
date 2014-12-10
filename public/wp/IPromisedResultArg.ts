/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="IResult.ts" />
module wp {
  export interface IPromisedResultArg
    extends ng.IHttpPromiseCallbackArg<IResult> {
  }
}
