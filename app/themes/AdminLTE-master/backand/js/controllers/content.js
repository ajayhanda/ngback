'use strict';


angular.module('backAnd.controllers')
.controller('contentController', ['$scope', 'Global', '$http', 'contentService', '$sce',
    function ($scope, Global, $http, contentService, $sce) {
        $scope.global = Global;
        $scope.$watch('content', function () {
            if ($scope.content)
                $scope.setData();
        });
        $scope.init = function() {
            $scope.setData();
        }
        $scope.setData = function() {
            contentService.queryjsonp({
                content: $scope.global.currentTableID
            }, function (data) {
                $scope.content = data;
                
            });
            
        }

        $scope.getDefaultIFrameHeight = function () {
            var top = $('div[data-ng-controller="contentController"]').position().top;
            var height = ($(window).height() - top - 10);
            return height;
        };

    }
    ])
