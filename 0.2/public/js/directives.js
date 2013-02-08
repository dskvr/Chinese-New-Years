'use strict';

/* Directives */


angular.module('myApp.directives', [])
  // .directive('appVersion', ['version', function(version) {
  //   return function(scope, elm, attrs) {
  //     elm.text(version);
  //   };
  // }]);
	.directive('sendData', function() {
   		return function(scope, element, attrs) {
        	element.click(function(){
				scope.socket.emit({ hello : 'world' });
			});
		}
	})

//   .directive('slider', function() {
//    return function(scope, element, attrs) {
//        element.datepicker({
//            inline: true,
//            dateFormat: 'dd.mm.yy',
//            onSelect: function(dateText) {
//                var modelPath = $(this).attr('ng-model');
//                putObject(modelPath, scope, dateText);
//                scope.$apply();
//            }
//        });
//    })
// 
//    .directive('knob', function() {
//      return function(scope, element, attrs) {
//        element.knob({
// 			change : function (value) {
// 		        //console.log("change : " + value);
//             },
//             release : function (value) {
//                 //console.log(this.$.attr('value'));
//                 console.log("release : " + value);
//             },
//             cancel : function () {
//                 console.log("cancel : ", this);s
//             },
// 		});
//    });
// });
