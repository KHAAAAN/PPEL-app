import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {FrontContentComponent} from './front-content.component';
import {FrontContentService} from './front-content.service';
import {NavbarComponent} from './navbar.component';

import {Tab} from './tab.component'
import {Tabs} from './tabs.component'
import {TabContent} from './tab-content.component'
import {TabContentService} from './tab-content.service'

@Component({
	selector: 'PPEL-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],

	directives: [FrontContentComponent, NavbarComponent, TabContent],
	providers: [HTTP_PROVIDERS, FrontContentService, TabContentService]
})

export class AppComponent {
	public title = 'PPEL';
}
