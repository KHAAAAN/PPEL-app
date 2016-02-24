import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {FrontContentComponent} from './front-content.component';
import {FrontContentService} from './front-content.service';
import {NavbarComponent} from './navbar.component';

@Component({
	selector: 'PPEL-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],

	directives: [FrontContentComponent, NavbarComponent],
	providers: [HTTP_PROVIDERS, FrontContentService]
})

export class AppComponent {
	public title = 'PPEL';
}
