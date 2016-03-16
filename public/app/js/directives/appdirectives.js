angular.module('app')
 .directive('autocompletes',function(Reasons){
        return {
            restrict: "A",
            require:"?ngModel",
            link:function(scope,element, attrs, ngModel){
                // Tasks.queryAllNames().success(function(data){
                $(element).autocomplete({
                    source:function(request, response) {
                        //console.log(eval(attrs.loaddata));
                        //Reasons.queryReasonName(request.term).success(function(data) {
                            response($.each(eval(attrs.loaddata), function(index, meta) {
                                meta.value = meta.dz;
                                meta.label = meta.dz;
                            }));
                        //})
                    },
                    select:function( event, ui ) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(ui.item.label);
                        })
                    }
                });
                // });

            }
        }
    })
    .directive('authApplication', function() {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {

                scope.$on('event:auth-loginRequired', function() {
                    //login.slideDown('slow', function() {
                    //    main.hide();
                    //});
                    //TODO login form
                    console.log("xu yao deng lu");
                });
                scope.$on('event:auth-loginConfirmed', function() {
                    //main.show();
                    //login.slideUp();
                    //TODO login hide
                    console.log("bu xu yao deng lu");
                });
            }
        }
    })
    .directive('selectbutton', ['$transition', function ($transition) {
        return {
            link: function (scope, element, attrs) {
               function noselected() {
                   scope.selectparam.splice(scope.selectparam.indexOf(attrs.selectparam),1);
                   if(attrs.rank){
                       scope.rank.splice(scope.rank.indexOf(attrs.rank),1);
                   }
                   if(attrs.xingbie){
                       scope.xingbie.splice(scope.xingbie.indexOf(attrs.xingbie),1);
                   }
                   if(attrs.politicalstatus){
                       scope.politicalstatus.splice(scope.politicalstatus.indexOf(attrs.politicalstatus),1);
                   }
                   if(attrs.edulevel){
                       scope.edulevel.splice(scope.edulevel.indexOf(attrs.edulevel),1);
                   }
                   if(attrs.age){
                       scope.age.splice(scope.age.indexOf(attrs.age),1);
                   }
                    element.removeClass('btn-danger');
                    element.addClass('btn-default');
                }
                function doseleted() {
                    scope.selectparam.push(attrs.selectparam);
                    if(attrs.rank){
                        scope.rank.push(attrs.rank);
                    }
                    if(attrs.xingbie){
                        scope.xingbie.push(attrs.xingbie);
                    }
                    if(attrs.politicalstatus){
                        scope.politicalstatus.push(attrs.politicalstatus);
                    }
                    if(attrs.edulevel){
                        scope.edulevel.push(attrs.edulevel);
                    }
                    if(attrs.age){
                        scope.age.push(attrs.age);
                    }
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
}).directive('ueditor', function () {
    /**
     * Created by xuanzhang on 14-5-12.
     */
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        template: '<script name="content" type="text/plain" ng-transclude>GGG</script>',
        require: '?ngModel',
        scope: {
            config: '='
        },
        link: function (scope, element, attrs, ngModel) {
            var editor = new UE.ui.Editor(scope.config || {});
            editor.render(element[0]);

            if (ngModel) {
                //Model数据更新时，更新百度UEditor
                ngModel.$render = function () {
                    try {
                        editor.setContent(ngModel.$viewValue);
                    } catch (e) {

                    }
                };

                //百度UEditor数据更新时，更新Model
                editor.addListener('contentChange', function () {
                    setTimeout(function () {
                        scope.$apply(function () {
                            ngModel.$setViewValue(editor.getContent());
                        })
                    }, 0);
                })
            }
        }
    }
});