import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VideoService {
	//constructor (private http: Http) {}

	//private _locationUrl = 'http://localhost:3000/;

	private _index = 0;	
	public players = [];


	makePlayer(id){
		this.players[this._index]  = videojs(id,
		{
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
		this.players[this._index].on('deviceError', function()
		{
			console.log('device error:', this.players[this._index].deviceErrorCode);
		});
		// user clicked the record button and started recording
		this.players[this._index].on('startRecord', function()
		{
			console.log('started recording!');
		});
		// user completed recording and stream is available
		this.players[this._index].on('finishRecord', function()
		{
			// the blob object contains the recorded data that
			// can be downloaded by the user, stored on server etc.
			console.log('finished recording: ', this.players[this._index].recordedData);
		});

		this._index++;
	}

	/*constructor(){

		this.players[0]  = videojs("myVideo",
		{
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
		this.players[0].on('deviceError', function()
		{
			console.log('device error:', this.players[0].deviceErrorCode);
		});
		// user clicked the record button and started recording
		this.players[0].on('startRecord', function()
		{
			console.log('started recording!');
		});
		// user completed recording and stream is available
		this.players[0].on('finishRecord', function()
		{
			// the blob object contains the recorded data that
			// can be downloaded by the user, stored on server etc.
			console.log('finished recording: ', this.players[0].recordedData);
		});

		this.players[1]  = videojs("myVideo2",
		{
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

		this.players[1].on('deviceError', function()
		{
			console.log('device error:', this.players[1].deviceErrorCode);
		});
		// user clicked the record button and started recording
		this.players[1].on('startRecord', function()
		{
			console.log('started recording!');
		});
		// user completed recording and stream is available
		this.players[1].on('finishRecord', function()
		{
			// the blob object contains the recorded data that
			// can be downloaded by the user, stored on server etc.
			console.log('finished recording: ', this.players[1].recordedData);
		});
	}*/

	private handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
