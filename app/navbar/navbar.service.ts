import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NavbarService {
	constructor (private http: Http) {
		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
			//this._locationUrl = 'http://debianvm.eecs.wsu.edu:3000';
			this._locationUrl = 'https://debianvm.eecs.wsu.edu:3000';
		}
		else{
			this._locationUrl = 'http://localhost:3000';
		}
		this._locationUrl += '/app/navbar/items.json';
	}

	private _locationUrl; // = 'http://localhost:3000/app/navbar/items.json';

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
