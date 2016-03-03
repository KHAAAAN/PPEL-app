import {Component, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {TabContentService} from './tab-content.service';
import { Tab } from './tab.component';
import { Tabs } from './tabs.component';

@Component({
	selector: 'tab-content',
	templateUrl: 'app/tab-content.component.html',
	directives: [Tab, Tabs]
})

export class TabContent {
	public files = [
	];

	public errorMessage: string;

	getContent() {
		this._tabContentService.getTabContent()
			.subscribe(files => {
				for (var i = 0; i < files.length/2; i++) {
					console.log(files[i]);

					this.files[i] = {}
					this.files[i].title = files[i*2];
					this.files[i].content = files[(i*2)+1];
			},

			error => this.errorMessage = <any>error
			);
	}

	constructor(private _tabContentService: TabContentService) { }

	ngOnInit() {
		this.getContent();
	}
}
