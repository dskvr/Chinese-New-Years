'use strict';

/* Controllers */

function AppCtrl($scope, socket) {
	
}

function cnyCtrl($scope, socket) {

	var formatJson = function(jsObj){
		return "@"+ JSON.stringify(jsObj) + "!";
	}

	var esc = function(msg){
        return msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      };

	var onConnect = function(){
		console.log("Connected to Socket")
		};
	var onDisconnect = function(){ 
		console.log("Disconnected from Socket");
		};
	var onReconnect = function(){ 
		console.log("Reconnect to Socket");
		};
	var reconnecting = function( nextRetry ){ 
		console.log("Reconnecting to Socket");
		};
	var onFailedReconnect =function(){ 
		console.log("Failed Reconnection to Socket");
		};
	var onMessage = function(msg){ 
		console.log("MESSAGE to Socket")
	}

	socket.on('connect', onConnect);
   socket.on('disconnect', onDisconnect);
   socket.on('reconnect', onReconnect);
   socket.on('reconnecting', reconnecting);
   socket.on('reconnect_failed', onFailedReconnect);
	socket.on('message', onMessage);
	
	var jsonReq = 	{
			"method":"chiller", 
			"options": {
				"speed" : 100,
				"mode" : "once"	
			}
		}
	var intval = setInterval(function(){
		socket.emit(formatJson(jsonReq));
		console.log('json sent.');
	},1000);
	
	socket.on('send',function(){
		console.log('Sent' + jsonReq + "!;")
	})
}

// function MyCtrl1($scope, socket) {
//   socket.on('send:time', function (data) {
//     $scope.time = data.time;
//   });
// }
// 
// MyCtrl1.$inject = ['$scope', 'socket'];
// 
// 
// function MyCtrl2() {
// 
// }
// 
// MyCtrl2.$inject = [];
