import { Component, ContentChildren, QueryList, AfterContentInit } from 'angular2/core';
import { Tab } from './tab.component';

@Component({
  selector: 'tabs',
  styles: [`
    .nav-tabs{
      width: 50%;
      margin-left:auto;
      margin-right:auto;
    }
   .nav-tabs li {
      list-style-type: none;   
      display: inline;     
      padding-right: 15px;
      padding-left : 0px;
      text-decoration:underline;
    }

    .nav-tabs li:hover {
       cursor:pointer;
     }
     
    .content {
      margin-left:auto;
      marign-righ:auto;
      text-align:center;
      width:200px;
    }
  `],
  template:`
  <ul class="nav nav-tabs" >
    <li *ngFor="#tab of tabs"
      (click)="selectTab(tab)" 
      [class.active] = "tab.active" >
      <a>{{tab.title }}</a>
    </li>
  </ul>
  <ng-content class="content"></ng-content>
  `
})

export class Tabs implements AfterContentInit {
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  // contentChildren are set, this allows us to wait for ContentChildren
  // to load the tabs QueryList
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: Tab){
    // set each tab to deactivated
    this.tabs.toArray().forEach(tab => tab.active = false);
    // activate the clicked tab
    tab.active = true;
  }
}