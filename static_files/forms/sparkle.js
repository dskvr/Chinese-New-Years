var form = {
  "schema": {
    "text": {
      "type": "string",
      "title": "Text"
    }
  },
  "form": [
    {
      "key": "text",
      "onChange": function (evt) {
        var value = $(evt.target).val();
        console.log(value);
      }
    },
    {
      "type": "button",
      "title": "Click me",
      "onClick": function (evt) {
        evt.preventDefault();
        alert('Thank you!');        
      }
    }
  ]
}

forms[].push(form);