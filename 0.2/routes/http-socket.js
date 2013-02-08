/*
 * This is where we 'chat' or push the HTTP WebSocket and connection details to the TCP Socket (./routes/tcp-socket-arduino.js)
 */

module.exports = function(client){
	
	//Send some data back to the client.
	client.send({ 

		//Sync the buffer
		buffer: buffer 

	});

	//Broadcast some ish
	client.broadcast.send({ 

		//Yeah, you're legit (We're fairly presumptuous)
		announcement: client.sessionId + ', ohhhhhhhhhh bakaw bakaw bakaw' 

	});

	//Push the client as a Guest
	httpGuests.push(client);

	//When something happens
	client.on('message', function(message){

		// Prepare the message for debugging.
		var msg = { message: [client.sessionId, message] };

		// Push the message into the buffer.
		buffer.push(msg);

		//Leaky Pipes
		if (buffer.length > 15) buffer.shift();

		//Send the client a debugging update
		client.broadcast.send(msg);
		
		//clear current TCP Timeout
		
		//Begin new TCP Timeout

		//For each TCP Connection
		for (g in tcpGuests) {

			//Send some data
		    tcpGuests[g].write(message);

		}
		
	});

	//How rude, no goodbye?
	client.on('disconnect', function(){

		//Tell them off.
		client.broadcast.send({ announcement: client.sessionId + ' left the cult.' });

	});
};