import {Component} from '@angular/core';

@Component({
	selector: 'navbar-item',
	templateUrl: 'app/navbar/navbar-item.component.html',
	styleUrls: ['app/navbar/navbar.component.css'],
	inputs: ['header', 'subItems', 'href']
})

export class NavbarItem {
	public header: string;
	public subItems: NavbarItem[];
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

  hoverOff(){
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

