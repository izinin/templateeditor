(function() {
    var app = angular.module('templateEditor', ['draggable']);

    app.controller('canvasController', function(){
        this.template = {};
        this.currid = 0;
        this.elementArray = [];
        this.setCurrent = function(val){
            this.currid = val ? val : 0;
            for(var i = 0; i < this.template.elements.length; i++){
                var box = this.template.elements[i];
                box.element.css({
                    borderColor: this.isSelected(box.id) ? 'red' : 'gray'
                })
            }
        };
        this.getIndex = function(idx){
            return this.template.elements[idx];
        };
        this.isSelected = function(idx){
            return idx == this.currid;
        };
    });
    
    app.directive('templateCanvas', ['$document', function($document) {
        var link = function(scope, element, attr, ctrl){
            ctrl.template = scope.template;
            ctrl.currid = scope.currentElementId;
        };
        
        return {
            restrict: 'E',
            controller:'canvasController',
            controllerAs:'ctrl',
            scope: {
                currentElementId: '=',
                template: '='
            },
            link: link,
            template:   '<div ng-repeat="box in template.elements">' +
                            '<template-box idx="box.id"></template-box>' +
                        '</div>'
        };
    }]);

})();