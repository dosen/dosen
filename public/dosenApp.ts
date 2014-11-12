var dosenApp = angular.module("dosenApp", []);
dosenApp.controller("CompetitionCtrl", CompetitionCtrl);
dosenApp.service("competitorfactory", CompetitorFactory);
dosenApp.service("extractor", Extractor);
dosenApp.service("wikipedia", Wikipedia);
