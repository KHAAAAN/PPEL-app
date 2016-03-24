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

export class TabContent implements OnInit {
	public files = [
	];

	public errorMessage: string;

	constructor(private _tabContentService: TabContentService){

	}

	getContent() {
		this._tabContentService.getTabContent()
			.subscribe( pages => {
			

				//console.log(pages);
			for(var i = 0; i < pages.length; ++i){
					this.files[i] = { 
						title: pages[i].Title, 
						content: pages[i].Content
					}

					//defaults to the first one
					if(i == 0){
						this.files[i].active = true;
					}
				}	

			},

			error => this.errorMessage = <any>error
			);

				   
	}

	ngOnInit(){
		this.getContent();
	}
}
