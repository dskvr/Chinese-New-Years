var socket = new io.connect(null, { port: 8090, rememberTransport: false});
   socket.on('message', function(obj){
        // if (obj.buffer){
        //           //ignore this
        //         } else message(obj);
	});

var $inputs, $flash;

var timeSinceLast = 0;

var jsonString;

var FLASH = false;

var jsonReq;

$(function(){
	// $inputs = $('input[type=text]');
	// $flash = $('.flash');

	// $input.change(effect.onChange);
	// $flash.onMousedown(effect.onFlash);
	// $flash.onMouseup(effect.onFlashup);
	// 
	$.each(forms, function(key, FORM){
		$form = $("<form>").appendTo('body');
		$form.addClass('effect');
		$form.attr('id', keys[key]);
		$form.jsonForm(FORM);
	});
})

var effect = {};

effect.queue = [];

effect.runQueue = function(){
	if(FLASH) return;
	jsonReq = effect.queue[0];
	effect.queue.pop();
	//unset(effect.queue[0]);
	effect.sendJson(jsonReq); //sending to Arduino.
	timeSinceLast = new Date().getTime();
}; 

effect.onChange = function(event){
	var now = new Date().getTime();
	if(now - timeSinceLast < 500) return;
	var $input = $(event.target);
	var $form = $input.parents('form');
	var $inputs = $parent.find('input[type=text]');
	
	//$inputs.each(function(){[]});
	jsonString = effect.formatJson( effect.serviceSerialize($form) );
	effect.queue.push(jsonString);
	effect.runQueue();
};

effect.onFlashdown = function(event){
	var now = new Date().getTime();
	if(now - timeSinceLast < 500) return;
	var $flash = $(event.target);
	var $form = $flash.parents('form');
	$flash.addClass('active');
	
	//$inputs.each(function(){[]});
	jsonString = effect.formatJson( effect.serviceSerialize($form) );
	effect.sendJson(jsonString);
	//flash.
	
};
effect.onFlashup = function(event){
	FLASH = false;
	$flash.removeClass('active');
	return;
};

effect.serviceSerialize = function($form){
	//Options
	var $frequency = $form.find('.frequency'), 
		$sustain = $form.find('.sustain'),
		$density = $form.find('.density'),
		$index = $form.find('.index');
	
	//Colors
	var $r = $form.find('.color.r'),
		$g = $form.find('.color.g'),
		$b = $form.find('.color.b');
		
	//Layout
	var $direction = $form.find('.direction'),
		$orientation = $form.find('.orientation'),
		$mode = $form.find('.mode');
		

	//Json Object
	var json = {};
		json.method = $form.attr('id');;
		json.options = {};
		json.options.frequency = ($frequency.length) ? $frequency.attr('value') : null;
		json.options.sustain = ($sustain.length) ? $sustain.attr('value') : null;
		json.options.density = ($density.length) ? $sustain.attr('value') : null;
		json.options.index = ($index.length) ? $index.attr('value') : null;
		json.options.r = ($r.length) ? $r.attr('value') : null;
		json.options.g = ($g.length) ? $g.attr('value') : null;
		json.options.b = ($b.length) ? $b.attr('value') : null;
		json.options.direction = ($direction.length) ? $directoin.attr('value') : null;
		json.options.orientation = ($orientation.length) ? $orientation.attr('value') : null;
		json.options.mode = ($mode.length) ? $mode.attr('value') : null;
		
	return json;
};

effect.sendJson = function(formattedJsonString){
	socket.emit(formattedJsonString);
};

effect.formatJson(json){
	return "@" + JSON.stringify(json) + "!";
}

effect.select = function($form){
	$('form.selected').removeClass('selected');
	$form.addClass('selected');
};

effect.flash = function(){

};

