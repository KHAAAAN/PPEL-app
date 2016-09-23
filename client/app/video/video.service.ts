import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';
import {User} from '../user';

@Injectable()
export class VideoService {
	public userModel: User;

	private _locationUrl: string;
	private _locationUrls: any;

	//private _locationUrls = ['http://localhost:3000/public_video_QA', 'http://localhost:3000/private_video_QA', 'http://localhost:3000/video_answers'];

	public players = <any>[];
	public canSave: boolean[];
	public canDelete: boolean[];

	constructor(private http : Http, private _userService: UserService){
		this.userModel = _userService.getUserModel();	
		this.canSave = [];
		this.canDelete = [];
		console.log("this.canSave = ", this.canSave);

		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
			//this._locationUrl = 'http://debianvm.eecs.wsu.edu:3000';
			this._locationUrl = 'https://debianvm.eecs.wsu.edu:3000';
		}
		else{
			this._locationUrl = 'http://localhost:3000';
		}

		this._locationUrls = [this._locationUrl + '/public_video_QA',
			this._locationUrl + '/private_video_QA', 
			this._locationUrl + '/video_answers'
		]

	}

	getPublicVideos(){	
		return this.http.get(this._locationUrls[0])
		.map(res => res.json())
		.do(res => console.log("VideoService.getPublicVideos(): success"))
		.catch(this.handleError);
	}

	getYourAnswers(questionID: string){	
		//this.userModel = this._userService.getUserModel();	

		let params: URLSearchParams = new URLSearchParams();
		params.set('id', this.userModel.id);
		params.set('questionID', questionID);

		return this.http.get(this._locationUrls[2], {search: params})
		.map(res => res.json())
		.do(res => console.log("VideoService.getAnswers(): success"))
		.catch(this.handleError);
	}


	//TODO: MAKE SURE blob.name is unique to the user's vidoes later!!!
	saveRecording(fname: string, isPublic: boolean, questionID: string){
		//this.userModel = this._userService.getUserModel();	

		let params: URLSearchParams = new URLSearchParams();
		params.set('id', this.userModel.id);
		params.set('fname', fname);
		params.set('isPublic', "0");
		params.set('questionID', questionID);

		return this.http.get(this._locationUrl + "/test_save", {search: params})
		//.map(() => )
		.do(res => console.log("VideoService.saveRecording(): success"))
		.catch(this.handleError);
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
		formData.append('id', this.userModel.id);
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
		this.saveRecording(fname, isPublic, questionID)
		.subscribe();
		
	}

	deleteA(questionID: string){
		//this.userModel = this._userService.getUserModel();	

		let params: URLSearchParams = new URLSearchParams();
		params.set('questionID', questionID);
		params.set('id', this.userModel.id);

		return this.http.get(this._locationUrl + "/delete_videos", {search: params})
		.do((res: any) => console.log("VideoService.deleteRecording(): success"))
		.catch(this.handleError);
	}


	//Need to pass in user ID
	deleteAnswer(index: number, questionID: string){
		this.deleteA(questionID)
		.subscribe();
	}

	makeRecorder(index: number){
		var _this = this;

		var player = videojs("record"+index,
		{
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
		player.on('deviceError', function()
		{
			console.log('device error:', player.deviceErrorCode);
			_this.canSave[index] = false;
			_this.canDelete[index] = false;
		}); // user clicked the record button and started recording
		player.on('startRecord', function()
		{
			console.log('started recording!');
			_this.canDelete[index] = false;
		});
		// user completed recording and stream is available
		player.on('finishRecord', function()
		{
			// the blob object contains the recorded data that
			// can be downloaded by the user, stored on server etc.
			console.log('finished recording: ', player.recordedData);
			_this.canSave[index] = true;
			_this.canDelete[index] = true;
		});

		this.players[index] = player;
	}

	private handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
