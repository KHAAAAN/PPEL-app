import {Component, OnInit} from 'angular2/core';
import {NavbarService} from './navbar.service';
import {LinkItem} from './link-item';
import {NavbarItem} from './navbar-item.component';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
    directives: [NavbarItem],
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

	flip(item){
		if(item.subItems !== undefined && item.subItems.length > 0){
			item.expanded = !item.expanded;
		}
	}

	constructor (private _navbarService: NavbarService) {}

	ngOnInit(){
		this.getItems();
	}	
}
