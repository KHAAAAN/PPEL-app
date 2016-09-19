import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { HomeComponent } from './home/home.component';

import {HiddenNavbarComponent} from './hidden_navbar/hidden-navbar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NavbarItem} from './navbar/navbar-item.component';

import {LoginService} from './user/login.service';

import {Tab} from './tab/tab.component';
import {Tabs} from './tabs/tabs.component';
import {Ready, TabContent} from './tab/tab-content.component'

/*
import {TabContentService} from './tab/tab-content.service';
*/

import {User} from './user/user';

import {FrontContentComponent} from './front-content/front-content.component';

@NgModule({
  imports: [
  	BrowserModule,
  	HttpModule,
  	routing,
    FormsModule
  ],
  declarations: [
  	AppComponent,
    HomeComponent,
    FrontContentComponent,
    Tab, Tabs, Ready, TabContent,
    HiddenNavbarComponent,
    NavbarComponent,
    NavbarItem
  	],
  providers: [
    appRoutingProviders, HttpModule, LoginService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
