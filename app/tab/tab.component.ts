import {Component, Input} from 'angular2/core';
import {AfterViewInit} from 'angular2/core';
import {ViewChild} from 'angular2/core';

@Component({
  selector: 'tab',
  styleUrls: ['app/tab/tab.component.css'],
  templateUrl: 'app/tab/tab.component.html'
})

export class Tab implements AfterViewInit{
	@Input() active = false;
	@Input('tabTitle') title: string = "";
	@Input('content') content: string = "";

	@ViewChild('article') input;

	ngAfterViewInit(){	
	}
}
