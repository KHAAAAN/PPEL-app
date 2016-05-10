import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, RouteConfig} from 'angular2/router';

import {HomeComponent} from './home.component';
//import {LoginComponent} from './login.component';

import {UserService} from './user.service';
import {VideoService} from './video/video.service';

import {NavbarService} from './navbar/navbar.service';
import {NavbarComponent} from './navbar/navbar.component';

import {Tab} from './tab/tab.component'
import {Tabs} from './tabs/tabs.component'
import {TabContent} from './tab/tab-content.component'
import {TabContentService} from './tab/tab-content.service'

import {LoginService} from './login.service';

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
		component: HomeComponent/*,
		useAsDefault: true*/
	}
])

export class AppComponent implements OnInit {
	public title = 'PPEL';	


	constructor(private _router: Router, private _userService: UserService, private _loginService: LoginService){
		this.signIn();	
	}

	public signIn(){
		if(this._loginService.getCookie('pasessionid') !== ""){
			this._loginService.wsuRequest()
			.subscribe(res => {
					var id = res.split("\n")[2].split(" ")[2];	
					console.log("signIn(): id = " + id);
					this._loginService.authenticate(id)
					.subscribe(
						res => {
							if(res){	
								console.log(id + " exists");

								this._userService.setUserModel(id, res.ts, res.admin);
								let link = ['Home'];
								this._router.navigate(link);
							}
							else{
								console.log(id + " doesn't exist.");
							}
						}	
					);
					
				});
		}
		else{
			let link = ['Home'];
			this._router.parent.navigate(link);
		}
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
