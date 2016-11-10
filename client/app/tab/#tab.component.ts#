import {Component, Input, AfterViewInit, ViewChild} from '@angular/core';

import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {User} from '../user/user';
import {UserService} from '../user/user.service';

@Component({
  selector: 'tab',
  styleUrls: ['app/tab/tab.component.css'],
  templateUrl: 'app/tab/tab.component.html'
})

export class Tab implements AfterViewInit{
	public userModel: User;
	public isSuperUser: boolean;

	constructor (private http: Http,
		private _userService: UserService) {
		this.canEditTab = true;
		this.isSuperUser = false;

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

	@Input() active = false;
	@Input('tabTitle') title: string = "";
	@Input('content') content: string = "";
	@Input('enableEditor') canEditTab: boolean;

	private configSettings: string = ""

	@ViewChild('article') input:any;

	ngAfterViewInit(){
	}

	handleSave(event: Event) {
		var url: string;
		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
 			url = "https://debianvm.eecs.wsu.edu/tabpages/" + this.title;
  		}
  		else{
  			url = "http://localhost:3000/tabpages/" + this.title;
  		}

		url = encodeURI(url);
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
	    let body = JSON.stringify({"tab_content" : this.content});

	    console.log("body:" + body);
	    console.log("url: " + url);

	    this.http.put(url, body, options)
     		.map((res: Response) => res.json()).subscribe();;


    }
}
