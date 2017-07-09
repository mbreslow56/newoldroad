var app = angular.module('norApp', ['ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'index.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'contact.html'
    })
    .state('work', {
      url: '/work',
      templateUrl: 'work.html'
    })
});
