/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="ctrl.ts"/>
/// <reference path="comp.ts"/>
/// <reference path="Extractor.ts"/>
/// <reference path="wp.ts"/>
angular.module("dosenApp", [])
  .controller("CompetitionCtrl", ctrl.CompetitionCtrl)
  .service("competitor", comp.Factory)
  .service("extractor", Extractor)
  .service("wikipedia", wp.Wikipedia);
