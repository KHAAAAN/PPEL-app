System.register(['angular2/core', './navbar.service'], function(exports_1, context_1) {
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
    var core_1, navbar_service_1;
    var NavbarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (navbar_service_1_1) {
                navbar_service_1 = navbar_service_1_1;
            }],
        execute: function() {
            NavbarComponent = (function () {
                function NavbarComponent(_navbarService) {
                    this._navbarService = _navbarService;
                    this.socialHref = {
                        facebook: null,
                        twitter: null,
                        linkedin: null,
                        youtube: null
                    };
                }
                NavbarComponent.prototype.getItems = function () {
                    var _this = this;
                    this._navbarService.getItems()
                        .subscribe(function (data) {
                        _this.homePath = data.homePath;
                        _this.itemList = data.mainItems;
                        _this.ghostList = data.ghostItems;
                        _this.socialHref = data.socialHref;
                        _this.accessList = data.accessItems;
                        _this.captionPath = data.captionPath;
                    }, function (error) { return _this.errorMessage = error; });
                };
                NavbarComponent.prototype.hoverOn = function (item) {
                    if (item.subItems !== undefined) {
                        item.isHover = true;
                    }
                };
                NavbarComponent.prototype.hoverOff = function (item) {
                    if (item.subItems !== undefined) {
                        item.isHover = false;
                    }
                };
                NavbarComponent.prototype.checkForHref = function (item) {
                    if (item.href === undefined) {
                        return "javascript:;";
                    }
                    else {
                        return item.href;
                    }
                };
                NavbarComponent.prototype.ngOnInit = function () {
                    this.getItems();
                };
                NavbarComponent = __decorate([
                    core_1.Component({
                        selector: 'navbar',
                        templateUrl: 'app/navbar/navbar.component.html',
                        styleUrls: ['app/navbar/navbar.component.css']
                    }), 
                    __metadata('design:paramtypes', [navbar_service_1.NavbarService])
                ], NavbarComponent);
                return NavbarComponent;
            }());
            exports_1("NavbarComponent", NavbarComponent);
        }
    }
});
//# sourceMappingURL=navbar.component.js.map