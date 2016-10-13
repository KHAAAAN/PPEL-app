import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NavbarService {
	constructor (private http: Http) {
		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
			this._locationUrl = 'https://debianvm.eecs.wsu.edu';
		}
		else{
			this._locationUrl = 'http://localhost:3000';
		}
		this._locationUrl += '/app/navbar/items.json';
	}

	private _locationUrl : string;
	getItems () {
		return this.http.get(this._locationUrl)
		.map(res => res.json().data)
		.do(homePath => console.log(homePath))
		.catch(NavbarService.handleError);
	}

	private static handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
