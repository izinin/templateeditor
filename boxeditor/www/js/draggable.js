(function() {
    var app = angular.module('draggable', []);   

    app.directive('templateCanvas', ['$document', function($document) {
        var link = function(scope, element, attr, editor) {
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0;

            element.css({
                position: 'absolute',
                borderStyle: 'solid',
                borderWidth: 'small',
                borderColor: 'gray',
                cursor: 'move',
                top: editor.getIndex(scope.current).y,
                left: editor.getIndex(scope.current).x,
                width: editor.getIndex(scope.current).width + 'px',
                height: editor.getIndex(scope.current).height + 'px'
                });

            element.on('mousedown', function(event) {
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                               
                element.css({
                    borderColor: 'red',
                });
                editor.setCurrent(scope.current);
                document.querySelectorAll('#result')[0].innerText = 'selected box: ' + scope.current;
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
                element.css({
                    borderColor: 'gray',
                });
            }
        };

        return {
            restrict:'E',
            link: link,
            controller:'editorController',
            controllerAs:'editor',
            scope:{
                current: '=currentElementId'
            },
            template: '<div>{{editor.getIndex(current).text}}</div>'
        };
    }]);

})();