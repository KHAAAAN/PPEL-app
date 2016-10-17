import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

declare var myip: string;

@Injectable()
export class LoginService {
	constructor (private http: Http) {
		var hostName = window.location.hostname;

		if(hostName === "debianvm.eecs.wsu.edu"){
			this._locationUrl = 'https://debianvm.eecs.wsu.edu';
		}
		else{
			this._locationUrl = 'http://localhost:3000';
		}

	}

	private _locationUrl: string;

	authenticate (id: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);

		return this.http.get(this._locationUrl + "/login_attempt", {search: params})
		.map(res => res.json().data)
		.do(res => console.log("LoginService.authenticate(id): success"))
		.catch(this.handleError);
	}

	public getCookie(cname: string) {
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
		console.log(pa_session_id);
		console.log(myip);
		let params: URLSearchParams = new URLSearchParams();
		params.set('session_id', pa_session_id);
		params.set('client_address', myip);

		return this.http.get("https://secure.wsu.edu/login-server/auth-validate.asp", {search: params})
		.map(res => res.json().data)
		.do(str => console.log(str))
		.catch(this.handleError);

		/*var xhr = new XMLHttpRequest();

		xhr.open("GET", "https://secure.wsu.edu/login-server/auth-validate.asp?session_id="+ pa_session_id +"&client_address=" + myip, true);
		xhr.send();

		console.log(xhr.responseText);*/
	}

	private handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
