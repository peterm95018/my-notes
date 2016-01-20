// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function() { 
var app = angular.module('mynotes', ['ionic', 'mynotes.notestore']);


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  });

    $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  });

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  });

  $urlRouterProvider.otherwise('/list');
});



app.controller('ListCtrl', function($scope, NoteStore) {
  $scope.notes = NoteStore.list();
  $scope.reordering = false;

  $scope.remove = function(noteId) {
    NoteStore.remove(noteId);
  };

  $scope.move = function(note, fromIndex, toIndex) {
    NoteStore.move(note, fromIndex, toIndex);
  };

  $scope.toggleReordering = function() {
    $scope.reordering = !$scope.reordering;
  };

});


app.controller('EditCtrl', function($scope, $state, NoteStore) {
  $scope.note = angular.copy(NoteStore.get($state.params.noteId));

  $scope.save = function() {
    NoteStore.update($scope.note);
    $state.go('list');
  };

});

app.controller('AddCtrl', function($scope, $state, NoteStore) {
  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    NoteStore.create($scope.note);
    $state.go('list');
  };

});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});


}());

