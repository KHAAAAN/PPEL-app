import {Component, Input, AfterViewInit, ViewChild} from '@angular/core';


@Component({
  selector: 'tab',
  styleUrls: ['app/tab/tab.component.css'],
  templateUrl: 'app/tab/tab.component.html'
})

export class Tab implements AfterViewInit{
	@Input() active = false;
	@Input('tabTitle') title: string = "";
	@Input('content') content: string = "";

	@ViewChild('article') input:any;

	ngAfterViewInit(){	
	}
}
