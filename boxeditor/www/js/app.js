(function() {
  var app = angular.module('templateEditor', ['draggable']);

  app.controller('editorController', function(){
    this.template = template;
    this.current = 0;
    this.setCurrent = function(val){
        this.current = val ? val : 0;
    };
  });

  var template = {
   "width": 1920,
   "height": 1080,
   "elements": [
      {
         "id": 0,
         "x": 0,
         "y": 100,
         "z": 50,
         "width": 100,
         "height": 200,
         "text": "Sample text"
      },
      {
         "id": 1,
         "x": 10,
         "y": 200,
         "z": 40,
         "width": 100,
         "height": 200,
         "text": "Sample text 2"
      },
      {
         "id": 2,
         "x": 100,
         "y": 300,
         "z": 150,
         "width": 300,
         "height": 200,
         "text": "Sample text 3"
      }
   ]

}
  
})();
