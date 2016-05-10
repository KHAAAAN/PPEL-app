import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FrontContentService {
	constructor (private http: Http) {
		//var publicIp =		
		//this._locationUrl = 'http://debianvm.eecs.wsu.edu:3000/app/front-content/images.json';
	}

	//private _locationUrl = 'http://localhost:3000/app/front-content/images.json';
	private _locationUrl; 

	getImages () {
		return this.http.get(this._locationUrl)
		.map(res => <string[]> res.json().data)
		.do(data => console.log(data))
		.catch(FrontContentService.handleError);
	}

	private static handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
