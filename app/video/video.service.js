System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../user.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, user_service_1;
    var VideoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            VideoService = (function () {
                function VideoService(http, _userService) {
                    this.http = http;
                    this._userService = _userService;
                    this._locationUrls = ['http://localhost:3000/public_video_QA', 'http://localhost:3000/private_video_QA'];
                    this.players = [];
                    this.userModel = _userService.getUserModel();
                    this.canSave = [];
                    console.log("this.canSave = ", this.canSave);
                }
                VideoService.prototype.getPublicVideos = function () {
                    var params = new http_1.URLSearchParams();
                    params.set('id', this.userModel.id);
                    return this.http.get(this._locationUrls[0], { search: params })
                        .map(function (res) { return res.json(); })
                        .do(function (res) { return console.log("VideoService.getPublicVideos(): success"); })
                        .catch(this.handleError);
                };
                //TODO: MAKE SURE blob.name is unique to the user's vidoes later!!!
                VideoService.prototype.saveRecording = function (fname, isPublic, questionID) {
                    var params = new http_1.URLSearchParams();
                    params.set('id', this.userModel.id);
                    params.set('fname', fname);
                    params.set('isPublic', "0");
                    params.set('questionID', questionID);
                    return this.http.get("http://localhost:3000/test_save", { search: params })
                        .do(function (res) { return console.log("VideoService.saveRecording(): success"); })
                        .catch(this.handleError);
                };
                VideoService.prototype.testSave = function (index, fname, isPublic, questionID) {
                    console.log("testSave");
                    var xhr = new XMLHttpRequest();
                    //TODO: in firefox, take out the .video
                    var blob = this.players[index].recordedData.video;
                    var formData = new FormData();
                    //formData.append("blob", blob, blob.name);
                    formData.append('fname', fname);
                    formData.append('id', this.userModel.id);
                    formData.append('file', blob);
                    xhr.open("POST", "http://localhost:3001/upload", true);
                    //xhr.responseType = 'blob';
                    //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    //xhr.setRequestHeader("Content-type", "multipart/form-data");
                    xhr.send(formData);
                    //now save the Recording in database
                    this.saveRecording(fname, isPublic, questionID)
                        .subscribe();
                };
                /*testSave(index){
                     console.log("testSave");
                     var blob = this.players[index].recordedData.video;
             
                     var uploader = new qq.FineUploaderBasic({
                             debug: true,
                             request: {
                                 endpoint: 'http://localhost:3000/test_save'
                             },
                             validation: {
                                 allowedExtensions: ['mp4', 'webm', 'mp3', 'ogg', 'oga', 'ogg']
                             }
                     });
             
                     console.log(uploader);
             
                     //upload data to server
                     var filesList = [blob];
                     uploader.addFiles(filesList);
             
                 }*/
                VideoService.prototype.makeRecorder = function (index) {
                    var _this = this;
                    var player = videojs("record" + index, {
                        controls: true,
                        width: 300,
                        height: 240,
                        plugins: {
                            record: {
                                audio: true,
                                video: true,
                                maxLength: 120,
                                debug: true
                            }
                        }
                    });
                    // error handling
                    player.on('deviceError', function () {
                        console.log('device error:', player.deviceErrorCode);
                        _this.canSave[index] = false;
                    }); // user clicked the record button and started recording
                    player.on('startRecord', function () {
                        console.log('started recording!');
                        _this.canSave[index] = false;
                    });
                    // user completed recording and stream is available
                    player.on('finishRecord', function () {
                        // the blob object contains the recorded data that
                        // can be downloaded by the user, stored on server etc.
                        console.log('finished recording: ', player.recordedData);
                        _this.canSave[index] = true;
                    });
                    this.players[index] = player;
                };
                VideoService.prototype.handleError = function (error) {
                    console.log("errors4days");
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                VideoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
                ], VideoService);
                return VideoService;
            }());
            exports_1("VideoService", VideoService);
        }
    }
});
//# sourceMappingURL=video.service.js.map