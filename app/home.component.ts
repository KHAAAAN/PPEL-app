import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {FrontContentComponent} from './front-content.component';
import {FrontContentService} from './front-content.service';

import {NavbarService} from './navbar.service';
import {NavbarComponent} from './navbar.component';

import {Tab} from './tab.component';
import {Tabs} from './tabs.component';
import {TabContent} from './tab-content.component';
import {TabContentService} from './tab-content.service';

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
