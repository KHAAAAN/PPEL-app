import {Component, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {TabContentService} from './tab-content.service';

@Component({
	selector: 'tab-content',
	template: `
	<tabs id="main-tabs">
		<tab *ngFor=#file of files> file.content </tab>
	</tabs>
	`,
	styles: [`
	#main-tabs {
		height: 250px;
	}
	`]
})

export class TabContent {
	public files = [
	];

	public errorMessage: string;

	public content: string;

	getContent() {
		this._tabContentService.getTabContent()
			.subscribe(files => {
				for (var i = 0; i < files.length; i++) {
					console.log(files[i]);
					this.files[i] = {}
					this.files[i].content = files[i];
				}
			},

			error => this.errorMessage = <any>error
			);
	}

	constructor(private _tabContentService: TabContentService) { }

	ngOnInit() {
		this.getContent();
	}
}
