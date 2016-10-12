import {Component, Input, AfterViewInit, ViewChild} from '@angular/core';

import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'tab',
  styleUrls: ['app/tab/tab.component.css'],
  templateUrl: 'app/tab/tab.component.html'
})

export class Tab implements AfterViewInit{

	constructor (private http: Http) {
	}

	@Input() active = false;
	@Input('tabTitle') title: string = "";
	@Input('content') content: string = "";

	@ViewChild('article') input:any;

	private configSettings: string;

	ngAfterViewInit(){	
	}

	handleSave(event: Event) {
		var url: string;
		url = "localhost:3000/tabPages/" + this.title;
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({tab_content : this.content});
        console.log(body);
        console.log("url " + url);
        this.http.patch(url, body);
        //this.http.put(url, )
      
    }
}