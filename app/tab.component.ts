import { Component, Input} from 'angular2/core';
import { Vid } from './vid';

@Component({
  selector: 'tab',
  styleUrls: ['app/tab.component.css'],
  templateUrl: 'app/tab.component.html',
  directives: [Vid]
})

export class Tab{
	@Input() active = false;
	@Input('tabTitle') title: string;
	@Input('content') content: string = "";	
}


