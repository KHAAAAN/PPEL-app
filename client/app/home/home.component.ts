import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';

import {FrontContentService} from '../front-content/front-content.service';

import {User} from '../user/user';
import {UserService} from '../user/user.service';

import {NavbarService} from '../navbar/navbar.service';
import {TabContentService} from '../tab/tab-content.service';

import {HomeService} from './home.service';

@Component({
	selector: 'home',

	templateUrl: 'app/home/home.component.html',
	styleUrls: ['app/home/home.component.css'],
	providers: [FrontContentService, UserService,
	TabContentService,
	NavbarService,
	HomeService
	]
})

export class HomeComponent implements OnInit {
	public userModel: User;
	public isSuperUser: boolean;
	public viewable = false;
	public welcomeText: string;

	@Input('content') content: string = "";
	@Input('enableEditor') canEditTab: boolean = true;
	@ViewChild('article') input:any;

	constructor(private _userService:UserService,
				private _homeService: HomeService,
				private http: Http){

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
		} );

		//this is REALLY important
		this._userService.loadUser();
	}

	ngOnInit(){
		//this.userModel = this._userService.getUserModel();
		//console.log(this.userModel);

		this._homeService.getWelcomeMessage()
		.subscribe ((text:any) => {
			//this.welcomeText = text.Text;
			this.content = text.Text;
			console.log("welcome content: ", this.content);
		});
	}

	changeViewable(){
	  this.viewable = !this.viewable;
	}

	SaveWelcomeText() {
		var url: string;
		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
 			url = "https://debianvm.eecs.wsu.edu/welcomeText";
  		}
  		else{
  			url = "http://localhost:3000/welcomeText";
  		}

		url = encodeURI(url);
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
	    let body = JSON.stringify({"Text" : this.content});

	    console.log("body:" + body);
	    console.log("url: " + url);

	    this.http.put(url, body, options)
     		.map((res: Response) => res.json()).subscribe();
    }
}
