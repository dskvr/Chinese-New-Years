

var $inputs, $flash;

var timeSinceLast = 0;

var jsonString;

var FLASH = false;

var jsonReq;

var fireEveryXSeconds = 500;

effect = {};

effect.queue = [];

effect.runQueue = function(){

	if(FLASH) return;
	console.log('queue size: ' + effect.queue.length);
	jsonReq = effect.queue[0];
	effect.queue.pop();
	//unset(effect.queue[0]);
	effect.sendJson(jsonReq); //sending to Arduino.
	timeSinceLast = new Date().getTime();
	console.log('queue size: ' + effect.queue.length);
}; 

effect.onChange = function(event){
	console.log("Form changed.");
	var now = new Date().getTime();
	if(now - timeSinceLast < 500) return;
	var $input = $(event.target);
	var $form = $input.parents('form');
	var $inputs = $form.find('input[type=text], input[type=hidden]');
	
	//$inputs.each(function(){[]});
	jsonString = effect.formatJson( effect.serviceSerialize($form) );
	effect.queue.push(jsonString);
	effect.runQueue();
};

effect.syncForm = function($form) {
	var now = new Date().getTime();
	if(now - timeSinceLast < fireEveryXSeconds) return;
	
	//$inputs.each(function(){[]});
	jsonString = effect.formatJson( effect.serviceSerialize($form) );
	effect.queue.push(jsonString);
	effect.runQueue();
}

effect.onMousedown = function(event){
	var now = new Date().getTime();
	if(now - timeSinceLast < fireEveryXSeconds) return;
	var $flash = $(event.target);
	var $form = $flash.parents('form');
	$flash.addClass('active');
	
	//$inputs.each(function(){[]});
	jsonString = effect.formatJson( effect.serviceSerialize($form) );
	effect.sendJson(jsonString);
	//flash.
	
};
effect.onMouseup = function(event){
	FLASH = false;
	$flash.removeClass('active');
	return;
};

effect.serviceSerialize = function($form){
	console.log("JSONifying FORM");
		
	//Options
	var $frequency = $form.find('.frequency'), 
		$sustain = $form.find('.sustain'),
		$density = $form.find('.density'),
		$index = $form.find('.index');
	
	//Colors
	var $r = $form.find('input[name=r]'),
		$g = $form.find('input[name=g]'),
		$b = $form.find('input[name=b]');
		
	//Layout
	var $direction = $form.find('.direction'),
		$orientation = $form.find('.orientation'),
		$mode = $form.find('.mode');
		
	console.log('RGB: ('+ $r.attr('value') +","+ $g.attr('value')  +","+ $b.attr('value')  +")");
		

	//Json Object
	var json = {};
		json.method = $form.attr('id');;
		json.options = {};
		if($frequency.length) json.options.frequency = $frequency.attr('value');
		if($sustain.length) json.options.sustain = $sustain.attr('value');
		if($density.length) json.options.density = $sustain.attr('value');
		if($index.length) json.options.index =  $index.attr('value');
		if($r.length) json.options.r = parseInt($r.attr('value'));
		if($g.length) json.options.g = parseInt($g.attr('value'));
		if($b.length) json.options.b = parseInt($b.attr('value'));
		if($direction.length) json.options.direction = $directoin.attr('value');
		if($orientation.length) json.options.orientation = $orientation.attr('value');
		if($mode.length) json.options.mode = $mode.attr('value');
	
	return json;
};

effect.sendJson = function(formattedJsonString){
	console.log("Sending JSON String: " + formattedJsonString);
	socket.send(formattedJsonString);
};

effect.formatJson = function(json){
	return "@" + JSON.stringify(json) + "!";
};

effect.select = function($form){
	$('form.selected').removeClass('selected');
	$form.addClass('selected');
};


effect.flash = function(){
	
};

// $(function(){
	// alert(forms.length);

	
	// $inputs = $('input[type=text]');
	// $flash = $('.flash');

	// $inputs.change(effect.onChange);
	// $flash.mousedown(effect.onMousedown);
	// $flash.mouseup(effect.onMouseup);
// });