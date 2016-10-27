import {Component, OnInit} from '@angular/core';

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
	public viewable = false;
	public welcomeText: string;

	constructor(private _userService:UserService,
				private _homeService: HomeService){}

	ngOnInit(){
		this.userModel = this._userService.getUserModel();
		console.log(this.userModel);

		this._homeService.getWelcomeMessage()
		.subscribe ((text:any) => {
			this.welcomeText = text.Text;
		});
	}

	changeViewable(){
	  this.viewable = !this.viewable;
	}
}
