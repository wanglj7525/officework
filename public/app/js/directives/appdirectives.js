angular.module('app')
    .directive('selectbutton', ['$transition', function ($transition) {
        return {
            link: function (scope, element, attrs) {
               function noselected() {
                   scope.selectparam.splice(Array.indexOf(scope.selectparam,attrs.selectparam),1);
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
    }]);