import {Component} from 'angular2/core';

@Component({
	selector: 'navbar-item',
	templateUrl: 'app/navbar/navbar-item.component.html',
	directives: [Navbar-Item],
	styleUrls ['app/navbar/navbar.component.css'],
	inputs: ['header', 'subItems']
})

export class Navbar-Item {
	public header: string;
	public subItems: Navbar-Item[];
	public href: string;
	public isHover: boolean;
	public expanded: boolean = false;

	constructor(){
		this.subItems = [];
	}

	flip(){
		if(this.subItems !== undefined && this.subItems.length > 0){
			this.expanded = !this.expanded;
		}
	}

       hoverOn(){
	       if(this.subItems !== undefined && this.subItems.length > 0){
		       this.isHover = true;
	       }
        }

       hoverOff(this){
	       if(this.subItems !== undefined && this.subItems.length > 0){
		       this.isHover = false;
		}
	}


	checkForHref(){
		if(this.href === undefined){
			return "javascript:;";
		}
		else{
			return this.href;
		}
	}
}

