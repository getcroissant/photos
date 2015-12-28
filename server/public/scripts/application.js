//Global elements the needs to be loaded once
global.jQuery = require('jquery');
global.bootstrap = require('bootstrap');

//Angular dependencies
var angular = require('angular');
var angularCookies = require('angular-cookies');

//Utilities
var moment = require('moment');

var app = angular.module('website', [angularCookies]);

//Directives
app.directive('confirmClick', require('./directives/confirmClick'));

//Filters
app.filter('humanize', require('./filters/humanize'));

//Factories
app.factory('Authentication', require('./factories/authentication'));
app.factory('Place', require('./factories/place'));
app.factory('Profile', require('./factories/profile'));

//Controller
app.controller('HeaderController', require('./controllers/headerController'));
app.controller('FooterController', require('./controllers/footerController'));
app.controller('SplashController', require('./controllers/splashController'));