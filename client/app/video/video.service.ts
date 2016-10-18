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

	public players = <any>[];
	public canSave: boolean[];
	public canDelete: boolean[];

	constructor(private http : Http, 
		        private _userService: UserService,
		        private sanitizer: DomSanitizer){
		this.userModel = _userService.getUserModel();	
		this.canSave = [];
		this.canDelete = [];
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
			
			formData.append("video", this.players[0].recordedData.video, this.players[0].recordedData.video.name);
			formData.append("userId", 11335741);

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

	saveAnswer(index: number, fname: string, isPublic: boolean, questionID: string){
		//this.userModel = this._userService.getUserModel();	
			
		console.log("testSave");
		var xhr = new XMLHttpRequest();
		var blob: any;

		//if chrome
		if (/chrome/i.test( navigator.userAgent ) === true){
			blob = this.players[index].recordedData.video;
		}
		//if firefox
		else if ( (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) === true){
			blob = this.players[index].recordedData;
		}
		//TODO: support all browsers
		else{
			blob = this.players[index].recordedData;
		}

		console.log(blob);
		console.log(blob.video);
		//var blob = this.players[index].recordedData;

		var formData = new FormData();
		//formData.append("blob", blob, blob.name);
		
		console.log(this.userModel);
		formData.append('fname', fname);
		//formData.append('id', this.userModel.id);
		formData.append('file', blob);

		if(this._locationUrl == 'https://debianvm.eecs.wsu.edu:3000'){
			xhr.open("POST", "https://debianvm.eecs.wsu.edu:3001/upload", true);
		}
		else{
			xhr.open("POST", "http://localhost:3001/upload", true);
		}
		//xhr.responseType = 'blob';
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		//xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//xhr.setRequestHeader("Content-type", "multipart/form-data");
		
		xhr.send(formData);

		//now save the Recording in database
		//this.saveRecording(fname, isPublic, questionID)
		//.subscribe();
		
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

	makeRecorder(){
		var _this = this;

		var player = videojs("rvideo",
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

		//All these arrays had 'index' as its posistion into it. 

		// error handling
		player.on('deviceError', function()
		{
			console.log('device error:', player.deviceErrorCode);
			_this.canSave[0] = false;
			_this.canDelete[0] = false;
		}); // user clicked the record button and started recording
		player.on('startRecord', function()
		{
			console.log('started recording!');
			_this.canDelete[0] = false;
		});
		// user completed recording and stream is available
		player.on('finishRecord', function()
		{
			// the blob object contains the recorded data that
			// can be downloaded by the user, stored on server etc.
			console.log('finished recording: ', player.recordedData);
			_this.canSave[0] = true;
			_this.canDelete[0] = true;

			// Setting unsaved video src
			var url = window.URL.createObjectURL(player.recordedData.video);
			console.log("url: ", url);
			
			var unSavVid = videojs("unsavedVideo");
			unSavVid.src(url);
			unSavVid.show();

		});

		this.players[0] = player;
	}


	private handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
