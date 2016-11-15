import {Injectable, Component} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {User} from './user';

import {LoginService} from './login.service';

import 'rxjs/add/operator/share'; //for sharing Observable stream


@Injectable()
export class UserService {

	private userModel: User;
	private _userObserver: any;
	private _dataStore: {
			users: Array<User>
		};

	public user$: Observable<Array<User>>;


	public setUserModel(){
		this.userModel = new User();

		let isAdmin = false;
		this.checkIsAdmin()
				.subscribe((res:any)=>{
						console.log("checking if admin, res = ", res.length)
						if (res.length > 0)
						{
							isAdmin = res.admin;
							console.log("is admin = ", isAdmin);
						}
					});

		this.userModel.permissions["normalUser"] = true;
		if(isAdmin){
			this.userModel.permissions["superUser"] = true;
		}

		this.loadUser();
	}

	private checkIsAdmin () {
		var urlGetRequest = "https://debianvm.eecs.wsu.edu/api/users/isAdmin";

		return this.http.get(urlGetRequest)
			.map((res:any) => res.json())
			.do((res:any) => console.log("CheckIsAdmin(): success"))
			.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.log("errors4days");
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}

	loadUser(){
		this._dataStore.users = [this.userModel];

		if(this._userObserver != undefined){
			//push datastore.users into rx stream
			this._userObserver.next(this._dataStore.users);
		}
	}

	unloadUser(){
		this.userModel = null;
		this._dataStore.users = [null];

		//push datastore.users into rx stream
		this._userObserver.next(this._dataStore.users);

		//remove cookies
		document.cookie = "pasessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	}

	public getUserModel(){
		return this.userModel;
	}

	constructor(private _loginService: LoginService,
				private http: Http){
		this.user$ = new Observable((observer:any) => {
			console.log(observer);
			 this._userObserver = observer;

		}).share();
		
		this._dataStore = { users: [] };
	}	
	
	

}
