import { Component } from '@angular/core';

import { HttpModule } from '@angular/http';
import {  RouterModule } from '@angular/router';


@Component({
	selector: 'PPEL-app',
	templateUrl: 'app/app.component.html',
	providers: [
		HttpModule,
		RouterModule
	]
})


export class AppComponent { }


