angular.module('app')
    .directive('selectbutton', ['$transition', function ($transition) {
        return {
            link: function (scope, element, attrs) {
               function noselected() {
                   scope.selectparam.splice(scope.selectparam.indexOf(attrs.selectparam),1);
                    element.removeClass('btn-danger');
                    element.addClass('btn-default');
                }
                function doseleted() {
                    scope.selectparam.push(attrs.selectparam);
                    element.removeClass('btn-default');
                    element.addClass('btn-danger');
                }
                scope.$watch(attrs.selectbutton, function (isselect) {
                    var i=0;
                    if (isselect) {
                        doseleted();
                    } else {
                        noselected();
                    }
                });
            }
        };
    }]).directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 50) {
                scope.isfix = true;
                console.log('Scrolled below header.');
            } else {
                scope.isfix = false;
                console.log('Header is in view.');
            }
            scope.$apply();
        });
    };
});