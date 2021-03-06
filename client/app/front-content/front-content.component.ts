import {Component, OnInit} from '@angular/core';
import {FrontContentService} from './front-content.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable'
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

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

	transition(index: number){

        this.curIndex = index;
        this.curPicture = this.images[this.curIndex].picture;
        //console.log(this.curPicture);

        //reset subscription because think about it..
        //if we were to select a radio button the interval should reset to 2000
        //not stay at 2000 - x, x >= 0

        this.resetSubscription();
	}

	/*This method subscribes our transition subscription variable (transSub)
	 *to changing at every interval
	 */
	autoSubscribe(){
		this.transSub = new IntervalObservable(10000).subscribe(() => {
			//let temp = this.curIndex;

			this.curIndex = (this.curIndex + 1) % this._totalPics; //switch to this.images.length
            this.curPicture = this.images[this.curIndex].picture;
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
				this.curIndex = 0;
				this.curPicture = this.images[0].picture;

				this.autoSubscribe();
			},

			error => this.errorMessage = <any>error
		);
	}

	constructor (private _frontContentService: FrontContentService,
                private sanitizer: DomSanitizer) {}

	ngOnInit(){
		this.getImages();
	}
}
