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
    var core_1;
    var VideoTab;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            VideoTab = (function () {
                function VideoTab() {
                    this.active = false;
                    this.title = "Your Videos";
                }
                //@ViewChild('article') input;
                VideoTab.prototype.ngAfterViewInit = function () {
                    var player = videojs("record", {
                        controls: true,
                        width: 320,
                        height: 240,
                        plugins: {
                            record: {
                                audio: true,
                                video: true,
                                maxLength: 10,
                                debug: true
                            }
                        }
                    });
                    // error handling
                    player.on('deviceError', function () {
                        console.log('device error:', player.deviceErrorCode);
                    });
                    // user clicked the record button and started recording
                    player.on('startRecord', function () {
                        console.log('started recording!');
                    });
                    // user completed recording and stream is available
                    player.on('finishRecord', function () {
                        // the blob object contains the recorded data that
                        // can be downloaded by the user, stored on server etc.
                        console.log('finished recording: ', player.recordedData);
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], VideoTab.prototype, "active", void 0);
                VideoTab = __decorate([
                    core_1.Component({
                        selector: 'video-tab',
                        styleUrls: ['app/tab.component.css'],
                        templateUrl: 'app/video-tab.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], VideoTab);
                return VideoTab;
            }());
            exports_1("VideoTab", VideoTab);
        }
    }
});
//# sourceMappingURL=video-tab.component.js.map