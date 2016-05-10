import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

declare var myip;

@Injectable()
export class LoginService {
	constructor (private http: Http) {
		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
			this._locationUrl = 'http://debianvm.eecs.wsu.edu:3000';
		}
		else{
			this._locationUrl = 'http://localhost:3000';
		}

		this._locationUrl += "/login_attempt";	
	}

	//private _locationUrl = 'http://localhost:3000/login_attempt';
	private _locationUrl;

	authenticate (id: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);

		return this.http.get(this._locationUrl, {search: params})
		.map(res => res.json().data)
		.do(res => console.log("LoginService.authenticate(id): success"))
		.catch(this.handleError);
	}

	private getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length,c.length);
			}
		}
		return "";
	}

	wsuRequest(){
		var pa_session_id = this.getCookie('pasessionid');
		let params: URLSearchParams = new URLSearchParams();
		params.set('session_id', pa_session_id);
		params.set('client_address', myip);

		return this.http.get(this._locationUrl, {search: params})
		.map(res => res)
		.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.log("errors4days")
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
