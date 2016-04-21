import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {FrontContentComponent} from './front-content/front-content.component';
import {FrontContentService} from './front-content/front-content.service';

import {NavbarService} from './navbar/navbar.service';
import {NavbarComponent} from './navbar/navbar.component';

import {Tab} from './tab/tab.component';
import {Tabs} from './tabs/tabs.component';
import {TabContent} from './tab/tab-content.component';
import {TabContentService} from './tab/tab-content.service';

import {User} from './user';
import {UserService} from './user.service';

@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
	styleUrls: ['app/home.component.css'],

	directives: [FrontContentComponent, NavbarComponent, TabContent],
	providers: [FrontContentService, TabContentService, NavbarService]
})

export class HomeComponent implements OnInit {
	public userModel: User;

	constructor(private _userService:UserService){}

	ngOnInit(){
		this.userModel = this._userService.getUserModel();
		console.log(this.userModel);
	}
}
