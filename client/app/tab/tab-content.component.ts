import {Input, Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TabContentService} from './tab-content.service';

import {Tab} from './tab.component';
import {Tabs} from '../tabs/tabs.component';

//import {VideoService} from '../video/video.service';

import {User} from '../user/user';
import {UserService} from '../user/user.service';

@Component({
	selector: 'ready',
	template: ``
})
export class Ready implements AfterViewInit{
	@Input('index') index:number;
	constructor(
		//private _videoService: VideoService
		){
	}
	ngAfterViewInit(){
		console.log(this.index);
		//this._videoService.makeRecorder(this.index)
	}
}

@Component({ selector: 'tab-content', templateUrl: 'app/tab/tab-content.component.html',
	styleUrls: ['app/tab/tab-content.component.css'],
	//directives: [Tab, Tabs, Ready]
})

export class TabContent implements OnInit {
	public files = <any>[];
	public videoData = <any>[];
	public answervideoData = <any>[];
	public selectedQuestion = <any>[];

	public userModel: User;

	public errorMessage: string;

	constructor(private _tabContentService: TabContentService,
			   //private _videoService: VideoService,
			   private _userService: UserService){

		//when ready to set this.userModel, it will do so
		this._userService.user$.subscribe(userModel => {
			this.userModel = userModel[0];

			console.log(this.userModel);


		} );

		//this is REALLY important
		this._userService.loadUser();
	}

	logout(){
		this._userService.unloadUser();
	}

	getUser(){
		return this._userService.getUserModel();
	}

	getContent() {
		this._tabContentService.getTabContent()
			.subscribe((pages:any) => {

			var i: number;
			for(i = 0; i < pages.length; ++i){
					this.files[i] = {
						title: pages[i].Title,
						content: pages[i].Content
					};

					//defaults to the first one
					if(i == 0){
						this.files[i].active = true;
					}
				}

			},

			error => this.errorMessage = <any>error
			);


	}
/*
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
*/
/*
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
/*
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

*/



	private getBase(path: string){
		var l = path.split("/");
		var x = l[l.length - 1];
		var y = x.substring(0, x.indexOf('.'));

		return y;
	}

	ngOnInit(){
		this.getContent();
		//this.getPublicVideos();
	}

	//private cougLinkContent = "<div id=\"symp_jobswidget\" data-csm=\"wsu-csm.symplicity.com\" data-id=\"3c03fee9e5418f3f5be5643490884b37" data-size="custom" data-css="http://wsu-csm.symplicity.com/css/list_jobs_widget.css" data-logo="" data-header-text="Business Widget" data-width="380" data-height="220" data-sort-by="" ></div> <script>(function(d, s, id) {   var js, sjs = d.getElementsByTagName(s)[0];   if (d.getElementById(id)) {return;}   js = d.createElement(s); js.id = id;   js.src = "https://static.symplicity.com/jslib/jobswidget/jobswidget.js";   sjs.parentNode.insertBefore(js, sjs); }(document, "script", "symp_jobswidget_js"));</script>"

}
