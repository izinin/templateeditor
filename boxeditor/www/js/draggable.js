(function() {
    var app = angular.module('draggable', []);   

    app.directive('myDraggable', ['$document', function($document) {
        var link = function(scope, element, attr, editor) {
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0;

            element.css({
                position: 'relative',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
                cursor: 'pointer' /*,
                top: editor.y,
                left: editor.x,
                width: editor.width + 'px',
                height: editor.height + 'px',*/
                });

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
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
                console.log("-->" + editor.template.elements[0].text);
            }
        };

        return {
            restrict:'A',
            link: link,
            controller:'editorController',
            controllerAs:'editor'
        };
    }]);

})();