import { NgModule,  }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { appRoutingProviders, appRoutes } from './app.routing';
import { HomeComponent } from './home/home.component';

import {CKEditorModule} from 'ng2-ckeditor';

import {HiddenNavbarComponent} from './hidden_navbar/hidden-navbar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NavbarItem} from './navbar/navbar-item.component';

import {LoginService} from './user/login.service';

import {Tab} from './tab/tab.component';
import {Tabs} from './tabs/tabs.component';
import {Ready, TabContent} from './tab/tab-content.component'

import {ModalModule} from "ng2-modal";

/*
import {TabContentService} from './tab/tab-content.service';
*/

import {User} from './user/user';

import {FrontContentComponent} from './front-content/front-content.component';

import {RouterModule} from '@angular/router'

@NgModule({
  imports: [
  	BrowserModule,
  	HttpModule,
    FormsModule,
    CKEditorModule,
    ModalModule,
    RouterModule.forRoot(appRoutes)
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
    HttpModule, LoginService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
