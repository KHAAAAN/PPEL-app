import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TabContentService {
	constructor (private http: Http) {
		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
			//this._locationUrl = 'http://debianvm.eecs.wsu.edu:3000';
			this._locationUrl = 'https://debianvm.eecs.wsu.edu:3000';
		}
		else{
			this._locationUrl = 'http://localhost:3000';
		}
		this._locationUrl += '/app/tabcontent';
	}

	//private _locationUrl = 'http://localhost:3000/app/tabcontent';
	private _locationUrl;

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
