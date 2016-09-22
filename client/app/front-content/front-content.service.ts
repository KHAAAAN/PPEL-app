import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";


@Injectable()
export class FrontContentService {
	constructor (private http: Http) {
		var hostName = window.location.hostname;

		console.log(hostName);

		if(hostName === "debianvm.eecs.wsu.edu"){
			this._locationUrl = 'https://debianvm.eecs.wsu.edu:3000/app/front-content/images.json';
		}
		else{
			this._locationUrl = 'http://localhost:3000/app/front-content/images.json';
		}
	}

	private _locationUrl: string;

	getImages() {
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
