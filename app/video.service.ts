import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {User} from './user';

@Injectable()
export class VideoService {
	//constructor (private http: Http) {}
	public userModel: User;

	private _locationUrls = ['http://localhost:3000/public_video_QA', 'http://localhost:3000/private_video_QA'];

	public players = [];
	public canSave: boolean[];

	constructor(private http : Http, private _userService: UserService){
		this.userModel = _userService.getUserModel();	
		this.canSave = [];
		console.log("this.canSave = ", this.canSave);

	}

	getPublicVideos(){	
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', this.userModel.id);

		return this.http.get(this._locationUrls[0], {search: params})
		.map(res => res.json())
		.do(res => console.log("VideoService.getPublicVideos(): success"))
		.catch(this.handleError);
	}


	//TODO: MAKE SURE blob.name is unique to the user's vidoes later!!!
	saveRecording(blob, isPublic, questionID){
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', this.userModel.id);
		params.set('videoName', blob.name);
		params.set('isPublic', "1");
		params.set('questionID', questionID);

		return this.http.get(this._locationUrls[0], {search: params})
		.map(res => <number>res.json().data)
		.do(res => console.log("VideoService.saveRecording(): success"))
		.catch(this.handleError);
	}

	testSave(index){
		console.log("testSave");
		var xhr = new XMLHttpRequest();
		var blob = this.players[index].recordedData;

		var formData = new FormData();
		formData.append("blob", blob, blob.name);

		xhr.open("POST", "http://localhost:3000/test_save", true);
		xhr.responseType = 'blob';
		//xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		/*xhr.onreadystatechange = function() {//Call a function when the state changes.
			if(xhr.readyState == 4 && xhr.status == 200) {
				//saveAs(blob, "Report.pdf");
			}
		}*/

		xhr.send(formData);
		
	}

	makeRecorder(index){
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
		}); // user clicked the record button and started recording
		player.on('startRecord', function()
		{
			console.log('started recording!');
			_this.canSave[index] = false;
		});
		// user completed recording and stream is available
		player.on('finishRecord', function()
		{
			// the blob object contains the recorded data that
			// can be downloaded by the user, stored on server etc.
			console.log('finished recording: ', player.recordedData);
			_this.canSave[index] = true;
		});

		this.players[index] = player;
	}

	private handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
