// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function() { 
var app = angular.module('starter', ['ionic']);

var notes = [];

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

function getNote(noteId) {
  for (var i = 0; i < notes.length; i++) {   
    if (notes[i].id === noteId) {
      return notes[i];
    }
  }
  return undefined;
}

function updateNote(note) {
  for (var i = 0; i < notes.length; i++) {   
    if (notes[i].id === note.id) {
      notes[i] = note;
      return;
    }
  }
}

function createNote(note) {
  notes.push(note);
};

app.controller('ListCtrl', function($scope) {
  $scope.notes = notes;

});


app.controller('EditCtrl', function($scope, $state) {
  $scope.note = angular.copy(getNote($state.params.noteId));

  $scope.save = function() {
    updateNote($scope.note);
    $state.go('list');
  };

});

app.controller('AddCtrl', function($scope, $state) {
  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    createNote($scope.note);
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

