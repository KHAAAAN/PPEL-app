import { Component, Input } from 'angular2/core';

@Component({
  selector: 'tab',
  styleUrls: ['app/tab.component.css'],
  templateUrl: 'app/tab.component.html'
})

export class Tab {
	@Input() active = false;
	@Input('tabTitle') title: string;
}