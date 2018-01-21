var app = angular.module('norApp', ['ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'templates/contact.html'
    })
    .state('work', {
      url: '/work',
      templateUrl: 'templates/work.html'
    })
    .state('thanks', {
      url: '/thanks',
      templateUrl: 'templates/thanks.html'
    })
    .state('blog', {
      url: '/blog',
      templateUrl: '../views/blog.html'
    })
    // .state('post', {
    //   url: '/blog/:slug',
    //   templateUrl: '../views/.html'
    // })
    // .state('article', {
    //   url: '/article',
    //   templateUrl: 'templates/articles/post.html'
    // })
});
