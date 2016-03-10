angular.module('ng-photostrip', [])
.directive('ngPhotostrip', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		scope: { 'ngPhotostrip': '=' },
		link: function (scope, element, attrs) {
			scope.$watch('ngPhotostrip', function (new_value, old_value) {
				element.hide();
				scope.$applyAsync(function () {
					element.show();
					var $ps = element.data('plugin_photostrip');
					if (!$ps) {
						element.photostrip(scope.ngPhotostrip);
					} else {
						$ps.update(scope.ngPhotostrip);
					}
				});
			});
		}
	}
}]);