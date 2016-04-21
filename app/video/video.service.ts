import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';
import {User} from '../user';

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
	saveRecording(fname, isPublic, questionID){
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', this.userModel.id);
		params.set('fname', fname);
		params.set('isPublic', "0");
		params.set('questionID', questionID);

		return this.http.get("http://localhost:3000/test_save", {search: params})
		//.map(() => )
		.do(res => console.log("VideoService.saveRecording(): success"))
		.catch(this.handleError);
	}

	testSave(index, fname, isPublic, questionID){
			
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
		
	}

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
