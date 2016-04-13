import {Component, OnInit} from 'angular2/core';
import {NavbarService} from './navbar.service';
import {NavbarItem} from './navbar-item';
import {LinkItem} from './link-item';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
    styleUrls: ['app/navbar/navbar.component.css']
})

export class NavbarComponent {
	//public hrefLinks: string[];
	public itemList: NavbarItem[];
	public ghostList: LinkItem[];
	public socialHref = {
			facebook: null as string,
		   	twitter: null as string,
		   	linkedin: null as string, 
			youtube: null as string
	};
	public accessList: LinkItem[];

	public homePath: string;
	public captionPath: string;
	public errorMessage: string;

	getItems(){
		this._navbarService.getItems ()
		.subscribe(
			data => {
				this.homePath = data.homePath;
				this.itemList = data.mainItems;
				console.log(this.itemList);
				this.ghostList = data.ghostItems;
				this.socialHref = data.socialHref;
				this.accessList = data.accessItems;
				this.captionPath = data.captionPath;
			},
			error => this.errorMessage = <any>error
		);
	}

	hoverOn(item){
		if(item.subItems !== undefined && item.subItems.length > 0){
			item.isHover = true;
		}
	}

	hoverOff(item){
		if(item.subItems !== undefined && item.subItems.length > 0){
			item.isHover = false;
		}
	}

	checkForHref(item){
		if(item.href === undefined){
			return "javascript:;";
		}
		else{
			return item.href;
		}
	}

	expand(item){
		if(item.subItems !== undefined){
			item.expanded = true;
		}
	}

	impolode(item){
		if(item.subItems !== undefined){
			item.expanded = false;
		}
	}

	constructor (private _navbarService: NavbarService) {}

	ngOnInit(){
		this.getItems();
	}	
}
