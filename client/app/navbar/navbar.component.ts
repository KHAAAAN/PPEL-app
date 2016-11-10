import {Component} from '@angular/core';
import {NavbarService} from './navbar.service';
import {LinkItem} from './link-item';
import {NavbarItem} from './navbar-item.component';

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
	public data: any;

	getItems(){
		this._navbarService.getItems ()
		.subscribe(
			data  => {
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

  hoverOn(item: any){
		if(item.subItems !== undefined && item.subItems.length > 0){
			item.isHover = true;
		}
	}

	hoverOff(item: any){
		if(item.subItems !== undefined && item.subItems.length > 0){
			item.isHover = false;
		}
	}
	
	constructor (private _navbarService: NavbarService) {}

	ngOnInit(){
		this.getItems();
	}
}
