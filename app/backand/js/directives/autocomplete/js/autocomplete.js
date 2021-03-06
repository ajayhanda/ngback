'use strict';

angular.module('backAnd.directives').directive('autocomplete', function () {
    console.log("autocomplete called");
    return {
    	restrict: 'A',
    	replace: true,
    	scope: {
    		field: "=",
    		value: "=",
            form: "=",
            inputClass: "="
    	},
    	templateUrl: 'backand/js/directives/autocomplete/partials/autocomplete.html',
    	controller: ['$scope', '$http', function ($scope, $http) {
    	    $scope.options = function (query) {
    	        return $http.get(backandGlobal.url + "/1/view/data/autocomplete/" + $scope.field.viewName + '/' + $scope.field.name, {
    	            params: { term: query, limit: 20 }
    	        })
                .then(function (response) {
                    return response.data;
                });
    	    };

    	    $scope.setPcode = function (item) {
    	        $scope.field.value.val = item.value;
    	    };
    	}],
    	link: function(scope, el, attrs) {
    	    console.log("autocomplete.js", scope);

    	}
    }
});