(function() {
    var app = angular.module('draggable', []);   

    app.directive('templateBox', ['$document', function($document) {
            
        var link = function(scope, element, attr, ctrl) {
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0;
            scope.box = ctrl.getIndex(scope.idx);
            scope.box.element = element;

            element.css({
                position: 'absolute',
                borderStyle: 'solid',
                borderWidth: 'small',
                borderColor: ctrl.isSelected(scope.idx) ? 'red' : 'gray',
                cursor: 'move',
                top: scope.box.y,
                left: scope.box.x,
                width: scope.box.width + 'px',
                height: scope.box.height + 'px'
                });

            element.on('mousedown', function(event) {
                texts = element.find('input');
                var isNotDraggable = false;
                for(var i=0; i<texts.length; i++){
                    if(event.target == texts[i]){
                        isNotDraggable = true;
                        break;
                    }
                }
                if(isNotDraggable)
                    return;
                
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                   
                ctrl.setCurrent(scope.idx);
                document.activeElement.blur();
                document.querySelectorAll('#result')[0].innerText = 'selected box: ' + scope.idx;
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                // updating data
                scope.box.x = x;
                scope.box.y = y;
                scope.box.text = element.find('input').val();
                var oldPrompt = document.querySelectorAll('#result')[0].innerText;
                document.querySelectorAll('#result')[0].innerText = oldPrompt + 
                    ' saved text: '+ scope.box.text +' coords {' + scope.box.x + ', ' + scope.box.y + '}'; 
            }
        };

        return {
            require: '^templateCanvas',
            restrict:'E',
            scope:{
                idx: '='
            },
            link: link,
            template: '<div class="template-box"><input type="text" value="{{box.text}}" style="border:none; width:90%; background: none;"></div>'
        };
    }]);

})();