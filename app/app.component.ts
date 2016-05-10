import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, RouteConfig} from 'angular2/router';

import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';

import {UserService} from './user.service';
import {VideoService} from './video/video.service';

import {NavbarService} from './navbar/navbar.service';
import {NavbarComponent} from './navbar/navbar.component';

import {Tab} from './tab/tab.component'
import {Tabs} from './tabs/tabs.component'
import {TabContent} from './tab/tab-content.component'
import {TabContentService} from './tab/tab-content.service'

import {LoginService} from './login.service';

declare var myip;

@Component({
	selector: 'PPEL-app',
	templateUrl: 'app/app.component.html',

	directives: [ROUTER_DIRECTIVES],
	providers: [HTTP_PROVIDERS,
				ROUTER_PROVIDERS,
				UserService,
				VideoService,
				LoginService
			   ]
})

@RouteConfig([
	/*{
		path: '/login',
	   	name: 'Login',
		component: LoginComponent,
		useAsDefault: true
	},*/
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
	}
])

export class AppComponent implements OnInit {
	public title = 'PPEL';	


	constructor(private _userService: UserService, private _loginService: LoginService){
		this.signIn();	
	}

	private getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length,c.length);
			}
		}
		return "";
	}

	public text: string;

	public signIn(){
		this._loginService.wsuRequest()
		.subscribe(res => {alert(res)});

		/*var pa_session_id = this.getCookie('pasessionid');

		if(pa_session_id !== ""){
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://secure.wsu.edu/login-server/auth-validate.asp?session_id="+ pa_session_id +"&client_address=" + myip, true);
			xhr.send();
			
			alert(xhr.responseText);
		}	*/
	}

		/*this._loginService.authenticate(this.id)
		.subscribe(
			res => {
				if(res){	
					console.log(this.id + " exists");

					this._userService.setUserModel(this.id, res.email, res.ts, res.admin);
					let link = ['Home'];
					this._router.parent.navigate(link);
				}
				else{
					console.log(this.id + " doesn't exist.");
				}
			}	
		);*/

	ngOnInit(){
	}
}
