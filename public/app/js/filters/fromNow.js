'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  // }).filter('worktipFilter', function() {  
  //  return function(input, param1) {  
  //     console.log("------------------------------------------------- begin dump of custom parameters");  
  //     console.log("input=",input);  
  //     console.log("param1(string)=", param1);  
  //     var args = Array.prototype.slice.call(arguments);  
  //     console.log("arguments=", args.length);  
  //     if (3<=args.length) {  
  //          console.log("param2(string)=", args[2]);  
  //     }  
  //     if (4<=args.length) {  
  //          console.log("param3(bool)=", args[3]);  
  //     }  
  //     console.log("------------------------------------------------- end dump of custom parameters");  
  //     // filter  
  //     if (5<=args.length) {  
  //          return window[args[4]](input);  
  //     }  
  //     return input;  
  //  };  
 }) .filter('startFrom', function () {
    return function (input, start) {
        if(input){
            return input.slice(start - 1);
        }
    };
});