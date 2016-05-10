import {Injectable, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

import 'rxjs/add/operator/share'; //for sharing Observable stream

@Injectable()
export class UserService {

	private userModel: User;

	public setUserModel(id: string, ts: string, token: number){
		this.userModel = new User();
		this.userModel.id = id;	
		this.userModel.ts = ts;

		this.userModel.permissions["normalUser"] = true;
		if(token === 1){
			this.userModel.permissions["superUser"] = true;
		}

	}

	public getUserModel(){
		return this.userModel;
	}

}
