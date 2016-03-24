import {Component, Input} from 'angular2/core';
//import {ViewChildren, ViewChild} from 'angular2/core';
import {AfterViewInit} from 'angular2/core';

@Component({
  selector: 'video-tab',
  styleUrls: ['app/tab.component.css'],
  templateUrl: 'app/video-tab.component.html'
})

export class VideoTab implements AfterViewInit{
	@Input() active = false;
	public title: string = "Your Videos";

	//@ViewChild('article') input;

	ngAfterViewInit(){
		
		var player = videojs("record",
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
