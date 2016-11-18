import {Input, Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TabContentService} from './tab-content.service';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

import {Tab} from './tab.component';
import {Tabs} from '../tabs/tabs.component';

import {VideoService} from '../video/video.service';

import {User} from '../user/user';
import {UserService} from '../user/user.service';

import myGlobals = require('../globals');

declare var videojs: any;

@Component({
	selector: 'ready',
	template: ``,
	providers: [VideoService]
})
export class Ready implements AfterViewInit{
	@Input('index') index:number;
	constructor(
		private _videoService: VideoService){
	}
	ngAfterViewInit(){
		console.log(this.index);
		this._videoService.makeRecorder();
	}
}

@Component({ selector: 'tab-content',
	templateUrl: 'app/tab/tab-content.component.html',
	styleUrls: ['app/tab/tab-content.component.css'],
	providers: [VideoService, Tab]
})

export class TabContent implements OnInit {
	public files = <any>[];
	public activeTab: any;
	public allQuestionVideos = <any>[];
	public answerVideo: any;
	public questionVideo: any;
	public selectedQuestion = <any>[];
	public questionText: any;
	public unSavedVideo: any;
	public isSuperUser: boolean;
	public questionEdit: string;
	public questionEditTitle: string;
	public questionEditText: string;
	public fileToUpload: File;

	public userModel: User;

	public errorMessage: string;

	constructor(private _tabContentService: TabContentService,
			   private _videoService: VideoService,
			   private _userService: UserService,
			   private sanitizer: DomSanitizer){

		this.isSuperUser = false;
		this.questionEdit = "createNew";
		this.questionEditText= "";
		this.questionEditTitle="";

		//when ready to set this.userModel, it will do so
		this._userService.user$.subscribe(userModel => {
			this.userModel = userModel[0];

			if (this.userModel != undefined)
			{
				if (this.userModel.permissions.superUser != null)
				{
					this.isSuperUser = this.userModel.permissions.superUser;
				}
			}

			console.log(this.userModel);
		} );

		//this is REALLY important
		this._userService.loadUser();
	}

	changeTab(title: string){
		console.log("changing tab to = ", title);
		this.activeTab = true;
	}

	logout(){
		// on logout reload the page
		this._userService.unloadUser();
		window.location.reload();
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
      (error: any) => this.errorMessage = <any>error
    );
	}

	// This will get the 'public' videos, meaning the video questions
	getPublicVideos(){
		console.log("in get public videos");

		this._videoService.getPublicVideos()
			.subscribe((res:any)=>{
				for(var i = 0; i < res.length; i++){
					this.allQuestionVideos.push(res[i]);

					if (i == 0)
					{
						console.log("setting default questions and answers");
						this.setSelectedQuestion(this.allQuestionVideos[0]._id);
						this.setQuestionAndAnswer(this.allQuestionVideos[0]._id);
					}
				}
				
			});

		console.log("all Videos = ", this.allQuestionVideos);
	}


	setSelectedQuestion(questionID: string) {
		console.log("getting selected question");

		//Loops through all avaliable videos and grabs the selected one
		for (var i = 0; i < this.allQuestionVideos.length; i++){
			if (questionID == this.allQuestionVideos[i]._id){
				console.log("i = ", i, "question id = ", this.allQuestionVideos[i]._id);
				console.log("questions id url = ", this.allQuestionVideos[i].path);

				//This wasnt chaning the source properly
				this.selectedQuestion[0] = this.allQuestionVideos[i];

				this.questionText = this.selectedQuestion[0].text;

				this.questionVideo = this.allQuestionVideos[i];

				//This properly changes the source of the videojs player
				console.log("selectedQuestion from inside select q = ", this.selectedQuestion);

				break;
			}
		}

		/*if (!isQSet) {
			this.selectedQuestion = new Array(0);
		}*/
	}

	setQuestionAndAnswer(questionID: string){
		console.log("in set q and a");
		var setA = false;

		// set answer to undefined
		this.answerVideo = undefined;

		if (this.selectedQuestion.length > 0)
		{
			var answer = this._videoService.getYourAnswers(questionID);
			console.log("after getting answer, before setting src");
			console.log("answer = ", answer);

			answer.subscribe((res:any)=>{
				if (res != undefined){
					console.log("res = ", res);
					//this.answervideoData.push(res);
					this.answerVideo = res;
					console.log("answerVideo = ", this.answerVideo.path);

					let avid = videojs("avideo");
					console.log("setting answer src to: ", res.path);
					avid.src('https://debianvm.eecs.wsu.edu' + res.path);
					avid.show();
					setA = true;

					console.log("making a new recorder");
					this._videoService.makeRecorder();

				}
			});

			// Set Question
			let qvid = videojs("qvideo");
			console.log("setting question src to: ", this.selectedQuestion[0].path);
			qvid.src('https://debianvm.eecs.wsu.edu' + this.selectedQuestion[0].path);

			let avid = videojs("avideo");

			// Set Answer if not set already
			if (!setA)
			{
				console.log("making a new recorder");
				this._videoService.makeRecorder();
				//this._videoService.makeRecorder();

				//avid.disose();
				console.log("setting answer src to: ");
				avid.src("");
				avid.hide();
			}
		}
	}

	getCanSave(index: number){
		var canSave = false;
		canSave = this._videoService.canSave[index];
		return canSave;
	}

	saveVideoAnswer() {
		console.log("Saving..");

		if (this._videoService.canSave == false)
		{
			console.log("Unable to save recording");
			return;
		}

		if (this.answerVideo != undefined)
		{
			this._videoService.deleteAnswer(this.answerVideo._id);
		}

		var savedVideo = this._videoService.saveRecording(this.selectedQuestion[0]._id);

		// this .then will wait for the call to return before executing. 
		savedVideo.then(result => { 
			this.setQuestionAndAnswer(this.selectedQuestion[0]._id);
			let unsavedVideo = videojs("unsavedVideo");
			unsavedVideo.hide();
			this._videoService.unSavedRecording = undefined;
			this.unSavedVideo = undefined;
		});
		
	}

	deleteVideoAnswer(){
		console.log("deleting..");
		//this.answerVideo = [];

		if (this.answerVideo == undefined)
		{
			return;
		}

		this._videoService.deleteAnswer(this.answerVideo._id)
		.then( result => {
			this.setQuestionAndAnswer(this.selectedQuestion[0]._id);
			this.answerVideo = undefined;
		});

		
		let avid = videojs("avideo");
		console.log("setting answer src to: ", "Empty");
		avid.src('');
		avid.hide();
	}

	GetIsUnsaved() {
		this.unSavedVideo = this._videoService.unSavedRecording;
	}

	stopAutoTrans() {
		console.log("setting trnas to false");
		myGlobals.autoTranitionVideo = false;
		console.log("auto trns = ", myGlobals.autoTranitionVideo);

		if (this.userModel != undefined)
		{
			if (this.userModel.permissions.superUser)
			{
				this._videoService.makeAdminRecorder();
			}
		}
	}

	private getBase(path: string){
		var l = path.split("/");
		var x = l[l.length - 1];
		var y = x.substring(0, x.indexOf('.'));

		return y;
	}

	setQuestionToEdit(questionID: string){
		this.questionEdit = questionID;
		console.log("q to edit: ", this.questionEdit);
	}

	questionToEditTitle(title: string) {
		this.questionEditTitle = title;
		console.log("q to edit Title: ", this.questionEditTitle);
	}

	questionToEditText(text: string) {
		this.questionEditText = text;
		console.log("q to edit text: ", this.questionEditText);
	}

	checkIsLoggedIn(){

		//TODO: Comment this out
		//this.setUserModel();

		this._videoService.getPublicVideos()
			.subscribe((res:any)=>{
				console.log("checking if logged in, res.len = ", res.length)
				if (res.length > 0)
				{
					//we are already logged in
					console.log("we are logged in! setting user model");
					this.setUserModel();
				}
			});
	}


	setUserModel() {
		//TODO: remove this
		//this._userService.setUserModel(true);

		//Get is admin from api
		// if admin
		this._userService.checkIsAdmin()
			.subscribe((result:any) =>{
				
					if (result.admin == true)
					{
						this._userService.setUserModel(true);
					}
					else
					{
						this._userService.setUserModel(false);
					}
				});


		console.log("User Model = ", this.userModel);

		this.ngOnInit();		
	}

	 uploadQuestion() {
		 if (this.questionEdit == "createNew") 
		 {
			 console.log("This.File = ", this.fileToUpload);
			 this._videoService.uploadNewQuestion(this.questionEditTitle, this.questionEditText, this.fileToUpload).then((result) => {
					console.log(result);
					this.allQuestionVideos = [];
					this.ngOnInit();
				}, (error) => {
					console.error(error);
				});
		 }
		 else
		 {
			 this._videoService.uploadEditToQuestion(this.questionEdit, this.questionEditTitle, this.questionEditText); 
			 this.allQuestionVideos = [];
			 this.ngOnInit();
				
		 }       
    }

	deleteQuestion() {
		this._videoService.deleteEditQuestion(this.questionEdit).then((result) => {
				console.log(result);
				this.allQuestionVideos = [];
				this.ngOnInit();
			}, (error) => {
				console.error(error);
			});

			this.allQuestionVideos = [];
			this.ngOnInit();
	}
 
    fileChangeEvent(fileInput: any){
        this.fileToUpload = <File> fileInput.target.files[0];
    }

	ngOnInit(){

		if (this.userModel == undefined)
		{
			this.getContent();
			this.checkIsLoggedIn();
		}
		else
		{
			this.getPublicVideos();
		}
	}

}
