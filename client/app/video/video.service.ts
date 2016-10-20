import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user/user.service';
import {User} from '../user/user';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

declare var videojs: any;

@Injectable()
export class VideoService {
	public userModel: User;

	private _locationUrl: string;
	private _locationUrls = <any>[];

	public unSavedRecording: any;
	public canSave: boolean;

	constructor(private http : Http, 
		        private _userService: UserService,
		        private sanitizer: DomSanitizer){
		this.userModel = _userService.getUserModel();	
		this.canSave = false;
		console.log("this.canSave = ", this.canSave);

		var hostName = window.location.hostname;

    	this._locationUrl = 'https://debianvm.eecs.wsu.edu';

		this._locationUrls = [
			this._locationUrl + '/VideoQuestions',
	        this._locationUrl + '/public_video_QA',
			this._locationUrl + '/private_video_QA',
			this._locationUrl + '/video_answers'
		];
	}

	getPublicVideos(){	
		console.log("in get all video questions");
		//console.log("UserModel = ", this.userModel);
		
		var urlGetRequest = this._locationUrl + "/api/questions";
		console.log("url request: ", urlGetRequest);

		return this.http.get(urlGetRequest)
			.map((res:any) => res.json())
			.do((res:any) => console.log("VideoService.getPublicVideos(): success"))
			.catch(this.handleError);
			
	}

	getYourAnswers(questionID: string){	
		//this.userModel = this._userService.getUserModel();	
		console.log("In get your answers");
		console.log("Want answer for questions id = ", questionID);

		// un coment the back when we get the auth done. 
		var urlGetRequest = this._locationUrl + "/api/responses/" + questionID + "?userId=" + "11335741";// + this.userModel.id;

		console.log("url request = ", urlGetRequest);
		var response = this.http.get(urlGetRequest);
		console.log("response = ", response);

		var toReturn = response
		.map(res => res.json())
		.do(res => console.log("VideoService.getAnswers(): success"))
		.catch(this.handleError);

		console.log("toReturn = ", toReturn);
		return toReturn;
	}


	//TODO: MAKE SURE blob.name is unique to the user's vidoes later!!!
	saveRecording(questionID: string){
		//this.userModel = this._userService.getUserModel();	
		console.log("Inside of Save Recording");

		return new Promise((resolve, reject) => {
			let formData: FormData = new FormData(),
				xhr: XMLHttpRequest = new XMLHttpRequest();

			formData.append("userId", 11335741);
			
			if (/chrome/i.test( navigator.userAgent ) === true){
				formData.append("video", this.unSavedRecording.recordedData.video, this.unSavedRecording.recordedData.video.name);
			} else if ( (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) === true){
				formData.append("video", this.unSavedRecording.recordedData, this.unSavedRecording.recordedData.name);
			} else {
				formData.append("video", this.unSavedRecording.recordedData, this.unSavedRecording.recordedData.name);
			}

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			};
			
			var requestURL = this._locationUrl + "/api/responses/" + questionID;

			xhr.open('POST', requestURL, true);
			xhr.send(formData);
		});
	}

	deleteAnswer(responseID: string){
		//this.userModel = this._userService.getUserModel();

		return new Promise((resolve, reject) => {
			let formData: FormData = new FormData(),
				xhr: XMLHttpRequest = new XMLHttpRequest();

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			};
			
			var deletRequest = this._locationUrl + "/api/responses/" + responseID;
			console.log("delete request = ", deletRequest);
			
			xhr.open("DELETE", deletRequest);
			xhr.send();
		});
	}

	SetUnsavedVideoSrc() {
		// Setting unsaved video src
		var url: string;

		if (/chrome/i.test( navigator.userAgent ) === true){
			url = window.URL.createObjectURL(this.unSavedRecording.recordedData.video);
		} else if ( (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) === true){
			url = window.URL.createObjectURL(this.unSavedRecording.recordedData);
		} else {
			url = window.URL.createObjectURL(this.unSavedRecording.recordedData);
		}

		var unSavVid = videojs("unsavedVideo");
		unSavVid.src(url);
		unSavVid.show();
	}

	makeRecorder(){
		var _this = this;

		var player = new videojs("rvideo",
		{
			controls: true,
			plugins: {
				record: {
					audio: true,
					video: true,
					maxLength: 120,
					debug: true,
					videoMimeType: "video/mp4"
				}
			},
		});

		//If we want to reset the recorder uncomment this line,
		// I think saving the same recorder makes sense
		// we would also need to set the unsaved video to hide. 
		//player.recorder.reset();

		// error handling
		player.on('deviceError', function()
		{
			console.log('device error:', player.deviceErrorCode);
			_this.canSave = false;
		});
		
		 // user clicked the record button and started recording
		player.on('startRecord', function()
		{
			console.log('started recording!');
		});
		
		// user completed recording and stream is available
		player.on('finishRecord', function()
		{
			// the blob object contains the recorded data that
			// can be downloaded by the user, stored on server etc.
			console.log('finished recording: ', player.recordedData);
			_this.canSave = true;

			_this.unSavedRecording = player;
			_this.SetUnsavedVideoSrc();

		});
	}

	private handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
