import {Component} from 'angular2/core';

@Component({
	selector: 'navbar-item',
	templateUrl: 'app/navbar/navbar-item.component.html',
	styleUrls ['app/navbar/navbar.component.css']
})

export class Navbar-Item {
	public header: string;
	public subItems: Navbar-Item[];
	public href: string;
	public isHover: boolean;
	public expanded: boolean = false;
}

