System.register(['angular2/core', './tab-content.service', './tab.component', '../tabs/tabs.component', '../video/video.service'], function(exports_1, context_1) {
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
    var core_1, tab_content_service_1, tab_component_1, tabs_component_1, video_service_1;
    var Ready, TabContent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tab_content_service_1_1) {
                tab_content_service_1 = tab_content_service_1_1;
            },
            function (tab_component_1_1) {
                tab_component_1 = tab_component_1_1;
            },
            function (tabs_component_1_1) {
                tabs_component_1 = tabs_component_1_1;
            },
            function (video_service_1_1) {
                video_service_1 = video_service_1_1;
            }],
        execute: function() {
            Ready = (function () {
                function Ready(_videoService) {
                    this._videoService = _videoService;
                }
                Ready.prototype.ngAfterViewInit = function () {
                    console.log(this.index);
                    this._videoService.makeRecorder(this.index);
                };
                __decorate([
                    core_1.Input('index'), 
                    __metadata('design:type', Number)
                ], Ready.prototype, "index", void 0);
                Ready = __decorate([
                    core_1.Component({
                        selector: 'ready',
                        template: ""
                    }), 
                    __metadata('design:paramtypes', [video_service_1.VideoService])
                ], Ready);
                return Ready;
            }());
            exports_1("Ready", Ready);
            TabContent = (function () {
                function TabContent(_tabContentService, _videoService) {
                    this._tabContentService = _tabContentService;
                    this._videoService = _videoService;
                    this.files = [];
                    this.videoData = [];
                }
                TabContent.prototype.getContent = function () {
                    var _this = this;
                    this._tabContentService.getTabContent()
                        .subscribe(function (pages) {
                        var i;
                        for (i = 0; i < pages.length; ++i) {
                            _this.files[i] = {
                                title: pages[i].Title,
                                content: pages[i].Content
                            };
                            //defaults to the first one
                            if (i == 0) {
                                _this.files[i].active = true;
                            }
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                TabContent.prototype.getPublicVideos = function () {
                    var _this = this;
                    this._videoService.getPublicVideos()
                        .subscribe(function (res) {
                        for (var i = 0; i < res.length; i++) {
                            _this.videoData.push(res[i]);
                        }
                    });
                };
                TabContent.prototype.getCanSave = function (index) {
                    var canSave = false;
                    canSave = this._videoService.canSave[index];
                    return canSave;
                };
                TabContent.prototype.saveVideoAnswer = function (index, path, isPublic, questionID) {
                    var base = this.getBase(path);
                    console.log("saving..");
                    this._videoService.testSave(index, base, isPublic, questionID);
                };
                TabContent.prototype.getBase = function (path) {
                    var l = path.split("/");
                    var x = l[l.length - 1];
                    var y = x.substring(0, x.indexOf('.'));
                    return y;
                };
                TabContent.prototype.ngOnInit = function () {
                    this.getContent();
                    this.getPublicVideos();
                };
                TabContent = __decorate([
                    core_1.Component({
                        selector: 'tab-content',
                        templateUrl: 'app/tab/tab-content.component.html',
                        directives: [tab_component_1.Tab, tabs_component_1.Tabs, Ready]
                    }), 
                    __metadata('design:paramtypes', [tab_content_service_1.TabContentService, video_service_1.VideoService])
                ], TabContent);
                return TabContent;
            }());
            exports_1("TabContent", TabContent);
        }
    }
});
//# sourceMappingURL=tab-content.component.js.map