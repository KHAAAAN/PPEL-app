System.register(['angular2/core', 'rxjs/Observable', './front-content.service'], function(exports_1, context_1) {
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
    var core_1, Observable_1, front_content_service_1;
    var FrontContentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (front_content_service_1_1) {
                front_content_service_1 = front_content_service_1_1;
            }],
        execute: function() {
            FrontContentComponent = (function () {
                function FrontContentComponent(_frontContentService) {
                    this._frontContentService = _frontContentService;
                    this.images = [];
                }
                FrontContentComponent.prototype.transition = function (index) {
                    this.curIndex = index;
                    this.curPicture = this.images[this.curIndex].picture;
                    console.log(this.curPicture);
                    //reset subscription because think about it..
                    //if we were to select a radio button the interval should reset to 2000
                    //not stay at 2000 - x, x >= 0
                    this.resetSubscription();
                };
                /*This method subscribes our transition subscription variable (transSub)
                 *to changing at every interval
                 */
                FrontContentComponent.prototype.autoSubscribe = function () {
                    var _this = this;
                    this.transSub = Observable_1.Observable.interval(10000).subscribe(function () {
                        //let temp = this.curIndex;
                        _this.curIndex = (_this.curIndex + 1) % _this._totalPics; //switch to this.images.length
                        _this.curPicture = _this.images[_this.curIndex].picture;
                    });
                };
                FrontContentComponent.prototype.resetSubscription = function () {
                    this.transSub.unsubscribe();
                    this.autoSubscribe();
                };
                FrontContentComponent.prototype.getImages = function () {
                    var _this = this;
                    this._frontContentService.getImages()
                        .subscribe(function (images) {
                        _this._totalPics = images.length;
                        for (var i = 0; i < _this._totalPics; i++) {
                            console.log(images[i]);
                            _this.images[i] = {};
                            _this.images[i].picture = images[i];
                        }
                        _this.curIndex = 0;
                        _this.curPicture = _this.images[0].picture;
                        _this.autoSubscribe();
                    }, function (error) { return _this.errorMessage = error; });
                };
                FrontContentComponent.prototype.ngOnInit = function () {
                    this.getImages();
                };
                FrontContentComponent = __decorate([
                    core_1.Component({
                        selector: 'front-content',
                        templateUrl: 'app/front-content/front-content.component.html',
                        styleUrls: ['app/front-content/front-content.component.css']
                    }), 
                    __metadata('design:paramtypes', [front_content_service_1.FrontContentService])
                ], FrontContentComponent);
                return FrontContentComponent;
            }());
            exports_1("FrontContentComponent", FrontContentComponent);
        }
    }
});
//# sourceMappingURL=front-content.component.js.map