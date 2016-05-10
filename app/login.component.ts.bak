import {Component} from 'angular2/core';
import {LoginService} from './login.service';
import {UserService} from './user.service';
import { Router, RouteParams } from 'angular2/router';


@Component({
	selector: 'login',
	templateUrl: 'app/login.component.html',
	styleUrls: ['app/login.component.css'],

	providers: [LoginService]
})

export class LoginComponent{

	public id: string;

	constructor(private _loginService: LoginService, private _userService: UserService, private _router: Router,
			   private _routeParams: RouteParams){
			   
			   }

	
	public signIn(){
		this._loginService.authenticate(this.id)
		.subscribe(
			res => {
				if(res){	
					console.log(this.id + " exists");

					this._userService.setUserModel(this.id, res.email, res.ts, res.admin);
					let link = ['Home'];
					this._router.parent.navigate(link);
				}
				else{
					console.log(this.id + " doesn't exist.");
				}
			}	
		);


	}
	
}
