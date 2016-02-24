import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    styleUrls: ['app/navbar.component.css']
})

export class NavbarComponent {
	//public hrefLinks: string[];
	public setOne: string[];
	public setTwo: string[];
	public setThree: string[];

	ngOnInit(){
		this.setOne = ["Dummy Option", "Open Recent"];
		this.setTwo = ["Option One", "Option Two"];
		this.setThree = ["Toggle Item", "Disable Item", "Exit"];	
	}	
}
