/**
 * @ngdoc service
 * @name app.uis
 *
 * @description
 * # uis
 * Service in the app.
 */
angular.module('app').factory('uis', function($q, $http) {
  var endpoint = "http://10.124.42.12:8080";
  return {
    get: function (id) {
      var deferred = $q.defer();
      $http.get(endpoint + 'uis-cst-read/rest/v1/cst/users/'+id)
        .success(function (data, headers) {
          deferred.resolve(data);
        }).error(function (err) {
          deferred.resolve(err);
        });
      return deferred.promise;
    },
    add: function (data) {
      var deferred = $q.defer();
      //console.log(data);
      $http.post(
        endpoint + '/uis-cst-write/rest/v1/cst/users', data
      ).success(function (data, headers) {
          deferred.resolve(data);
        }).error(function (err) {
          deferred.resolve(err);
        });
      return deferred.promise;
    }
  }
});
