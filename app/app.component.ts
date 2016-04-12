import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {FrontContentComponent} from './front-content/front-content.component';
import {FrontContentService} from './front-content/front-content.service';

import {NavbarService} from './navbar/navbar.service';
import {NavbarComponent} from './navbar/navbar.component';

import {Tab} from './tab/tab.component'
import {Tabs} from './tabs/tabs.component'
import {TabContent} from './tab/tab-content.component'
import {TabContentService} from './tab/tab-content.service'


@Component({
	selector: 'PPEL-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],

	directives: [FrontContentComponent, NavbarComponent, TabContent],
	providers: [HTTP_PROVIDERS, FrontContentService, TabContentService, NavbarService]
})

export class AppComponent implements OnInit {
	public title = 'PPEL';

	ngOnInit(){
	}
}
