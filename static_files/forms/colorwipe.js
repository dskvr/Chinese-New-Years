//Colorwipe
keys[].push('colorwipe');
forms[].push({
  "schema": {
	"direction": {
      "type": "string",
      "title": "Delay"
    },
	"frequency": {
      "type": "integer",
      "title": "Delay"
    }
  },
  "form": [
    {
      "key": "direction",
      "onChange": effect.onChange
    },
	 {
      "key": "frequency",
      "onChange": effect.onChange
    },
    {
      "type": "button",
      "title": "FLASH",
      "onMousedown": effect.onMousedown(),
      "onMousedown": effect.onMouseup()
    }
  ]
}};

