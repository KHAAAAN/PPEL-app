import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NavbarService {
	constructor (private http: Http) {}

	private _locationUrl = 'http://localhost:3000/app/navbar/items.json';

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
