System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2;
    var Tab;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            Tab = (function () {
                function Tab() {
                    this.active = false;
                    this.title = "";
                    this.content = "";
                }
                Tab.prototype.ngAfterViewInit = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Tab.prototype, "active", void 0);
                __decorate([
                    core_1.Input('tabTitle'), 
                    __metadata('design:type', String)
                ], Tab.prototype, "title", void 0);
                __decorate([
                    core_1.Input('content'), 
                    __metadata('design:type', String)
                ], Tab.prototype, "content", void 0);
                __decorate([
                    core_2.ViewChild('article'), 
                    __metadata('design:type', Object)
                ], Tab.prototype, "input", void 0);
                Tab = __decorate([
                    core_1.Component({
                        selector: 'tab',
                        styleUrls: ['app/tab/tab.component.css'],
                        templateUrl: 'app/tab/tab.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Tab);
                return Tab;
            }());
            exports_1("Tab", Tab);
        }
    }
});
//# sourceMappingURL=tab.component.js.map