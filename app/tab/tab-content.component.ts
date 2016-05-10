import {Input, Component, OnInit, AfterViewInit, ViewChild} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {TabContentService} from './tab-content.service';

import {Tab} from './tab.component';
import {Tabs} from '../tabs/tabs.component';

import {VideoService} from '../video/video.service';

import {User} from '../user';
import {UserService} from '../user.service';

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

@Component({ selector: 'tab-content', templateUrl: 'app/tab/tab-content.component.html',
	styleUrls: ['app/tab/tab-content.component.css'],
	directives: [Tab, Tabs, Ready]
})

export class TabContent implements OnInit {
	public files = [];
	public videoData = [];
	public answervideoData = [];

	public selectedQuestion = [];

	public errorMessage: string;

	constructor(private _tabContentService: TabContentService,
			   private _videoService: VideoService,
			   private _userService: UserService){
	}

	getUser(){
		return this._userService.getUserModel();
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

	//Gets a question based on the questionID
	getQuestion(questionID){
		console.log("getQuestion");


		//Checks to make sure the videojs player is visible, if not, it wont work
		if (this.selectedQuestion.length > 0){
			var vid = videojs("qvideo");
			console.log(vid);
		}

		//Loops through all avaliable videos and grabs the selected one
		for (var i = 0; i < this.videoData.length; i++){
			if (questionID == this.videoData[i].questionID){
				//This wasnt chaning the source properly
				this.selectedQuestion[0] = this.videoData[i];

				//This properly changes the source of the videojs player
				if (this.selectedQuestion.length > 0 && vid){
					vid.src({"type":"video/mp4", "src":this.selectedQuestion[0].path});
				}
				break;
			}
		}

		//Get answers
		/*this._videoService.getYourAnswers(questionID)
			.subscribe(res=>{
				if (res.length > 0){
					this.answervideoData.push(res[0]);
					//Have to dispose to create new recorders
					var rec = videojs("record1");
					rec.dispose();
				}
				else {
					this.answervideoData = [];
				}

				console.log("ans vid data: " + this.answervideoData);
			});*/

	}

	getAnswers(questionID){
		if(this.getUser() != undefined){
			this._videoService.getYourAnswers(questionID)
				.subscribe(res=>{
					if (res.length > 0){
						this.answervideoData.push(res[0]);
						//Have to dispose to create new recorders
						var rec = videojs("record1");
						rec.dispose();
					}
					else {
						this.answervideoData = [];
					}

					console.log("ans vid data: " + this.answervideoData);
				});
		}
	}



	getCanSave(index){
		var canSave = false;
		canSave = this._videoService.canSave[index];
		return canSave;

	}

	saveVideoAnswer(index, path, isPublic, questionID){
		var base = this.getBase(path);
		console.log("saving..");
		this._videoService.saveAnswer(index, base, isPublic, questionID);
	}


	deleteVideoAnswer(index, questionID){
		console.log("deleting..");
		this.answervideoData = [];
		this._videoService.deleteAnswer(index, questionID);
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
