import {Component, OnInit} from 'angular2/core';
import {NavbarService} from './navbar.service';
import {NavbarItem} from './navbar/navbar-item';
import {GhostItem} from './navbar/ghost-item';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    styleUrls: ['app/navbar.component.css']
})

export class NavbarComponent {
	//public hrefLinks: string[];
	public itemList: NavbarItem[];
	public ghostList: GhostItem[];
	public socialHref: Object{};

	public homePath: string;
	public errorMessage: string;

	getItems(){
		this._navbarService.getItems ()
		.subscribe(
			data => {
				this.homePath = data.homePath
				this.itemList = data.mainItems;
				this.ghostList = data.ghostItems;
				this.socialHref = data.socialHref;
			},
			error => this.errorMessage = <any>error
		);
	}

	hoverOn(item){
		if(item.subItems !== undefined){
			item.isHover = true;
		}
	}

	hoverOff(item){
		if(item.subItems !== undefined){
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


	constructor (private _navbarService: NavbarService) {}

	ngOnInit(){
		this.getItems();
	}	
}
