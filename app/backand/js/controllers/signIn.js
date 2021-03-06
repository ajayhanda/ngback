'use strict';


angular.module('backAnd.controllers')
    .controller('signInController', ['$scope', 'Global', '$http', '$location', '$rootScope','$route',
        function($scope, Global, $http, $location, $rootScope, $route) {
            $scope.global = Global;

            function toQueryString(obj) {
                var parts = [];
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                    }
                }
                return parts.join("&");
            }

            function getDefaultApp() {
                if (backandGlobal.defaultApp)
                    return backandGlobal.defaultApp;

                var hostSegments = location.hostname.split('.');
                if (hostSegments.length > 1) {
                    return hostSegments[0];
                }
                return '';
            }

            $scope.appName = getDefaultApp();
            $scope.waiting = false;

            $scope.authentication = function() {
                $scope.loginError = '';
                $scope.waiting = true;
                localStorage.removeItem("Authorization");
                var data = toQueryString({
                    grant_type: "password",
                    username: $scope.user,
                    password: $scope.password,
                    appname: $scope.appName,
                });
                var request = $http({
                    method: 'POST',
                    url: backandGlobal.url + "/token",
                    data: data,
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                request.success(function(data, status, headers, config) {
                    $http.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token;
                    localStorage.setItem('Authorization', $http.defaults.headers.common['Authorization']);
                    $location.path('/');
                    window.location.reload()
                    //$route.reload();
                });
                request.error(function (data, status, headers, config) {
                    var error_description = "The server is busy. Please contact your administrator or try again later.";
                    if (data && data.error_description)
                        error_description = data.error_description;
                    else {
                        //console.error(error_description, { data: data, status: status, headers: headers, config: config })
                    }
                    $scope.loginError = error_description;
                    console.log(status)
                    $scope.waiting = false;
                });

            }


        }
    ])
