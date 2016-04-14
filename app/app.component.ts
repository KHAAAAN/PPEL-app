import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, RouteConfig} from 'angular2/router';

import {HomeComponent} from './home.component';
import{LoginComponent} from './login.component';

import {UserService} from './user.service';
import {VideoService} from './video.service';

@Component({
	selector: 'PPEL-app',
	templateUrl: 'app/app.component.html',

	directives: [ROUTER_DIRECTIVES],
	providers: [HTTP_PROVIDERS,
				ROUTER_PROVIDERS,
				UserService,
				VideoService
			   ]
})

@RouteConfig([
	{
		path: '/login',
	   	name: 'Login',
		component: LoginComponent,
		useAsDefault: true
	},
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent
	}
])

export class AppComponent implements OnInit {
	ngOnInit(){
	}
}
