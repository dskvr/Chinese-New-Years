var rgbStringToObject = function(color){
	// var color = 'rgb(255, 15, 120)';
	var color = color.formatted;
	var matchColors = /rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)/;
	var match = matchColors.exec(color);
	console.log('Matching color: ' + color );
	// console.dir(color);
	if (match !== null) {
		
		var res = {};
		res.r = match[1];
		res.g = match[2];
		res.b = match[3];		
		
		console.log('RGB Found: ' + res.r + ',' + res.g + ',' + res.b);
		return res;
	} else {
		console.log('No RGB match in string.')
	}
}

$(function(){
	$inputs = $('input');
	
	$('.colorpicker').colorpicker({
		//options
		colorFormat: "RGB",
		
		// events
		select : function(event, color){
			// console.log(console.dir(color));
			
			var rgb = rgbStringToObject(color);
			
			$('input[name="r"]').attr('value', rgb.r); 
			$('input[name="g"]').attr('value', rgb.g);
			$('input[name="b"]').attr('value', rgb.b);
			
			effect.syncForm($('form'));
			
			return true;
			
			// $('input').trigger('change');
		}
		
	});

	
	$.each(forms, function(key, FORM){
		$form = $("<form>").appendTo('body');
		$form.addClass('effect');
		$form.attr('id', keys[key]);
		$form.jsonForm(FORM);
		console.log("Form Created: " + $form.attr('id'));
	});
	
	
});