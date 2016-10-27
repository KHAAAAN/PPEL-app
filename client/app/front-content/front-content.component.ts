import {Component, OnInit} from '@angular/core';
import {FrontContentService} from './front-content.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable'
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

import myGlobals = require('../globals');

declare var videojs: any;

@Component({
	selector: 'front-content',
	providers: [FrontContentService],
	templateUrl: 'app/front-content/front-content.component.html',
	styleUrls: ['app/front-content/front-content.component.css']
})

export class FrontContentComponent implements OnInit{
	public images = <any[]>[];

	public curIndex: number;
	public curPicture: SafeUrl;
	public transSub: any;
	public errorMessage: string;
	private _totalPics: number;
	public firstImage: any;
	//public autoTrans: boolean;
	private videoTransTimeout: number;

	transition(index: number){
        this.curIndex = index;
        this.curPicture = this.images[this.curIndex].picture;
        //console.log(this.curPicture);

        //reset subscription because think about it..
        //if we were to select a radio button the interval should reset to 2000
        //not stay at 2000 - x, x >= 0

		let v1 = videojs("vid1");

		

		//Reset the image that is displayed before we play the video
		v1.poster('');
		this.firstImage = undefined;

		if (index != 0)
		{
			v1.show();
			v1.src(this.images[index].picture.changingThisBreaksApplicationSecurity );
		}
		else
		{
			v1.hide();
			this.firstImage = this.curPicture;
		}

        this.resetSubscription();
	}

	/*This method subscribes our transition subscription variable (transSub)
	 *to changing at every interval
	 */
	autoSubscribe(){
		this.transSub = new IntervalObservable(this.videoTransTimeout).subscribe(() => {
			//let temp = this.curIndex;
			if (myGlobals.autoTranitionVideo) { // this.autoTrans == true) {
				this.transition((this.curIndex + 1) % this._totalPics);
			}
		});		
	}

	resetSubscription(){
		this.transSub.unsubscribe();
		this.autoSubscribe();
	}

	getImages(){
		this._frontContentService.getImages()
		.subscribe(images => {
				this._totalPics = images.length;
				for(var i = 0; i < this._totalPics; i++)
				{
					//console.log(images[i]);
					this.images[i] = {};
					this.images[i].picture = this.sanitizer.bypassSecurityTrustResourceUrl(images[i]);
				}				

				this.autoSubscribe();
				this.transition(0);

			},

			error => this.errorMessage = <any>error
		);
	}

	constructor (private _frontContentService: FrontContentService,
                private sanitizer: DomSanitizer) {
					this.videoTransTimeout = 10000;
					//this.autoTrans = true;
				}

	ngOnInit(){
		this.getImages();

		let v1 = videojs("vid1", {
			techOrder: ["youtube"], "sources": [{ "type": "video/youtube"}], "youtube": { "ytControls": 2 }
		});	

		var _this = this;

		// Keep track of the video, we need to know if it is playing or not.
		v1.on('play', function()
		{
			myGlobals.autoTranitionVideo = false;
			//_this.autoTrans = false;
		});

	}
}
