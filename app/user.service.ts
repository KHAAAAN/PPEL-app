import {Injectable} from 'angular2/core';
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

	public setUserModel(id: string, ts: string, token: number){
		this.userModel = new User();
		this.userModel.id = id;	
		this.userModel.ts = ts;

		this.userModel.permissions["normalUser"] = true;
		if(token === 1){
			this.userModel.permissions["superUser"] = true;
		}

		this.loadUser();
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

	constructor(private _loginService: LoginService){

		this.user$ = new Observable(observer => {
			console.log(observer);
			 this._userObserver = observer;


		}).share();
		
		this._dataStore = { users: [] };
	}	

}
