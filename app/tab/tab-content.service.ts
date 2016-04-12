import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TabContentService {
	constructor (private http: Http) {}

	private _locationUrl = 'http://localhost:3000/app/tabcontent';

	getTabContent() {
		return this.http.get(this._locationUrl)
			.map(res => res.json().Pages)
			.catch(TabContentService.handleError);
	}

	private static handleError(error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
