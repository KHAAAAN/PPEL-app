import {Component, OnInit} from 'angular2/core';

@Component({
	selector: "vid",
	templateUrl: "app/vid.html",
	styleUrls: ["app/vid.css"]
})

export class Vid implements OnInit {

	ngOnInit(){
		var player = videojs("myVideo",
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
		player.on('deviceError', function()
		{
			console.log('device error:', player.deviceErrorCode);
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
		});
	}		
}
