/*
 * Serve content over a TCP socket
 */

module.exports = function(socket){

		//Remind the socket who they're talking to "You talking to me?"
		socket.write('Word, I\'m TCP-Server. Pleasure is all mine I\'m sure. I will be talking to you reallllly fast and passing your responses to the HTTP Server, which will update the client for you. Cheers! \r\n');

		//Again, we like to brag.
		console.log( serverTcp.connections + ' connections to 1337');

		//Welcome!
		tcpGuests.push(socket);

		//When the TCP connection feels social. 
		socket.on('data',function(data){

			//Jordan's CC number here
			console.log('TCP Server here, just opened some mail, check it: ' + data );

			//Verbose.
			socket.write('I got that thing you sent me!\r\n');

			//For every blessed being
			for (g in io.clients) {

				//Eh
				var client = io.clients[g];

				//Yell at them from across the street. 
				client.send({message:["arduino",data]});

			}

		});

}