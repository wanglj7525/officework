angular.module('app')
    .directive('selectbutton', ['$transition', function ($transition) {
        return {
            link: function (scope, element, attrs) {
               function noselected() {
                    element.removeClass('btn-danger');
                    element.addClass('btn-default');
                }
                function doseleted() {
                    console.log("选中");
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