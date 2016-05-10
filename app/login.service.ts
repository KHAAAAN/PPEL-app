import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
	constructor (private http: Http) {
	
	}

	private _locationUrl = 'http://localhost:3000/login_attempt';

	authenticate (id: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);

		return this.http.get(this._locationUrl, {search: params})
		.map(res => res.json().data)
		.do(res => console.log("LoginService.authenticate(id): success"))
		.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.log("errors4days")
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
