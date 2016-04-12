import {Component, Input} from 'angular2/core';
import {AfterViewInit} from 'angular2/core';
import {ViewChild} from 'angular2/core';

@Component({
  selector: 'tab',
  styleUrls: ['app/tab/tab.component.css'],
  templateUrl: 'app/tab/tab.component.html'
})

export class Tab implements AfterViewInit{
	@Input() active = false;
	@Input('tabTitle') title: string = "";
	@Input('content') content: string = "";

	@ViewChild('article') input;

	ngAfterViewInit(){
	
		if(this.input.nativeElement.children.record){
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
}
