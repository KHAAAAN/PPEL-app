import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HomeService {
	constructor (private http: Http) {
		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
			this._locationUrl = 'https://debianvm.eecs.wsu.edu';
		}
		else{
			this._locationUrl = 'http://localhost:3000';
		}
		this._locationUrl += '/app/home/welcome.json';
	}

	private _locationUrl: string;

	getWelcomeMessage() {
		return this.http.get(this._locationUrl)
			.map((res:Response) => res.json())
			.catch(HomeService.handleError);
	}

	private static handleError(error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
