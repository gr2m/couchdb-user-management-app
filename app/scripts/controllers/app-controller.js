/* global couchDbUserManagementApp */
couchDbUserManagementApp.controller('AppCtrl', ['$scope', '$http', 'database', function($scope, $http, database){
  'use strict';

  // for quick debugging
  $scope.couchDbUrl='http://0.0.0.0:5984';
  $scope.username='admin';
  $scope.password='';

  $scope.$watch('currentUser', function(newValue) {
    if (newValue) {
      database.getUsers().then(function(users) {
        $scope.users = users;
      }).catch(function(error) {
        window.alert('could not load users');
        console.log(error);
      });
    } else {
      $scope.users = [];
    }
  });

  database.checkSession().then(
    function (username){
      $scope.currentUser = username;
      $scope.ready = true;
    }
  ).catch(function() {
    $scope.ready = true;
  });

  $scope.signIn = function() {
    database.signIn({
      username: $scope.username,
      password: $scope.password
    }).then(
      function(username) {
        $scope.currentUser = username;
        $scope.password = '';
      },
      function(error) {
        $scope.signInError = error;
      }
    );
  };

  $scope.signOut = function() {
    database.signOut().then(
      function() {
        $scope.currentUser = undefined;
      },
      function(error) {
        window.alert('Something went wrong');
        console.log(error);
      }
    );
  };

  $scope.addUser = function() {
    database.addUser({
      username: $scope.newUserUsername,
      password: $scope.newUserPassword,
      roles: $scope.newUserRoles.split(/\s*,\s*/)
    }).then(
      function(newUser) {
        $scope.users = $scope.users.concat([newUser]).sort(function(a,b) {
          return a.username > b.username ? 1 : -1;
        });
        $scope.newUserUsername = '';
        $scope.newUserPassword = '';
        $scope.newUserRoles = '';
      },
      function(error) {
        $scope.newUserUsernameError = error;
      }
    );
  };
  $scope.cancelNewUser = function() {
    $scope.newUserUsername = '';
    $scope.newUserPassword = '';
    $scope.newUserRoles = '';
    $scope.showNewUserForm = false;
  };

  $scope.toggleUser = function(user, $event) {
    if ($scope.isOpen(user)) {
      $scope.openUser = null;
    } else {
      $scope.openUser = user;
    }
    if ($event) {
      $event.preventDefault();
    }
  };

  $scope.updateUser = function(user) {
    database.updateUser(user.username, {
      username: user.newUsername,
      password: user.newPassword,
      roles: user.newRoles.split(/\s*,\s*/)
    }).then(
      function(updatedProperties) {
        user.username = updatedProperties.username;
        user.newUsername = user.username;
        user.newPassword = '';
        user.roles = updatedProperties.roles.join(', ');
        user.newRoles = user.roles;
        window.alert('user updated');
      },
      function(error) {
        window.alert('something went wrong: '+ error);
        console.log(error);
      }
    );
  };

  $scope.removeUser = function(user, $event) {
    $event.preventDefault();

    if (! window.confirm('Are you sure?')) {
      return;
    }
    database.removeUser(user.username).then(
      function() {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
      },
      function(error) {
        window.alert('something went wrong: '+ error);
        console.log(error);
      }
    );
  };

  $scope.isOpen = function(user) {
    return $scope.openUser === user;
  };
}]);
