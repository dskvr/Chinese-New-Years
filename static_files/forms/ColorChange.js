//Colorwipe
keys.push('ColorChange');
forms.push({
  "schema": {
	"r": {
      "type": "integer",
      "title": "Red",
		"default" : 255
    },
	"g": {
      "type": "integer",
      "title": "Green",
		"default" : 255
    },
	"b": {
      "type": "integer",
      "title": "Blue",
		"default" : 255
    }
  },
  "form": [
    {
      "key": "r",
      "onChange": effect.onChange
    },
	 {
      "key": "g",
      "onChange": effect.onChange
    },
	{
      "key": "b",
      "onChange": effect.onChange
    },
    // {
      // "type": "button",
      // "title": "FLASH",
      // "onMousedown": effect.onMousedown(),
      // "onMousedown": effect.onMouseup()
    // }
  ]
});

