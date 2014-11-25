/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="ctrl.ts"/>
/// <reference path="comp.ts"/>
/// <reference path="metric.ts"/>
/// <reference path="wp.ts"/>
angular.module("dosenApp", [])
  .controller("CompetitionCtrl", ctrl.CompetitionCtrl)
  .service("competitor", comp.Factory)
  .service("metric", metric.Factory)
  .service("wikipedia", wp.Wikipedia);
