import {Input, Component, OnInit, AfterViewInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {TabContentService} from './tab-content.service';

import {Tab} from './tab.component';
import {Tabs} from '../tabs/tabs.component';

import {VideoService} from '../video/video.service';

@Component({
	selector: 'ready',
	template: ``
})
export class Ready implements AfterViewInit{
	@Input('index') index:number;
	constructor(private _videoService: VideoService){
	}
	ngAfterViewInit(){
		console.log(this.index);
		this._videoService.makeRecorder(this.index)
	}
}

@Component({
	selector: 'tab-content',
	templateUrl: 'app/tab/tab-content.component.html',
	directives: [Tab, Tabs, Ready]
})

export class TabContent implements OnInit {
	public files = [];
	public videoData = [];

	public errorMessage: string;

	constructor(private _tabContentService: TabContentService,
			   private _videoService: VideoService){
	}

	getContent() {
		this._tabContentService.getTabContent()
			.subscribe( pages => {
			
			var i: number;
			for(i = 0; i < pages.length; ++i){
					this.files[i] = { 
						title: pages[i].Title, 
						content: pages[i].Content
					}

					//defaults to the first one
					if(i == 0){
						this.files[i].active = true;
					}
				}	

			},

			error => this.errorMessage = <any>error
			);

				   
	}

	getPublicVideos(){
		this._videoService.getPublicVideos()
		.subscribe(res=>{
			for(var i = 0; i < res.length; i++){
				this.videoData.push(res[i]);
				
				//make a recorder for this video in paralell
				//this._videoService.makeRecorder(i);
			}
			
		});	
	}

	getCanSave(index){
		var canSave = false;
		canSave = this._videoService.canSave[index];
		return canSave;

	}


	saveVideoAnswer(index, path, isPublic, questionID){
		var base = this.getBase(path);
		console.log("saving..");
		this._videoService.testSave(index, base, isPublic, questionID);
	}

	private getBase(path){
		var l = path.split("/");
		var x = l[l.length - 1];
		var y = x.substring(0, x.indexOf('.'));

		return y;
	}

	ngOnInit(){
		this.getContent();
		this.getPublicVideos();
	}


}

