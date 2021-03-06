angular.module('backAnd.directives')
.directive('iframecontent', function () {
	return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/iframecontent.html',
		replace: false,
		controller: 'contentController',
		scope: {
		    contentId: '='
		},
		link: function ($scope, element, attr) {
		    $scope.contentService.queryjsonp({
		        content: $scope.global.currentTableID
		    }, function (data) {
		        var iframe = element.find('iframe');
		        iframe.attr('src', data.iFrameURL);
		        if (data.width) {
		            iframe.attr('width', data.width);
		        }
		        else {
		            iframe.attr('width', '100%');
		        }
		        if (data.height) {
		            iframe.attr('height', data.height);
		        }
		        else {
		            iframe.attr('height', $scope.getDefaultIFrameHeight());
		        }
		        if (data.scroll) {
		            iframe.attr('scrolling', "no");
		        }
		    });
		    
		}
	}
});
