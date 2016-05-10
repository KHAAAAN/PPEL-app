import {Injectable, OnInit} from 'angular2/core';
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

	}

	loadUser(){
		this._dataStore.users = [this.userModel];

		//push datastore.users into rx stream
		this._userObserver.next(this._dataStore.users);
	}

	public getUserModel(){
		return this.userModel;
	}

	constructor(private _loginService: LoginService){

		this.user$ = new Observable(observer => {
				 this._userObserver = observer;



				if(this._loginService.getCookie('pasessionid') !== ""){
					this._loginService.wsuRequest()
					.subscribe(res => {
						var id = res.split("\n")[2].split(" ")[2];	
						console.log("signIn(): id = " + id);
						this._loginService.authenticate(id)
						.subscribe(
							res => {
								if(res){	
									this.setUserModel(id, res.ts, res.admin);
								}
							}	
						);
							
					});
				}

		}).share();
		
		this._dataStore = { users: [] };
	}	

}
