import { Component, ContentChildren, QueryList, AfterContentInit } from 'angular2/core';
import { Tab } from '../tab/tab.component';

@Component({
  selector: 'tabs',
  styleUrls: ['app/tabs/tabs.component.css'],
  templateUrl: 'app/tabs/tabs.component.html'
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
      //this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: Tab){
    // set each tab to deactivated
    this.tabs.toArray().forEach(tab => tab.active = false);
    // activate the clicked tab
    tab.active = true;
  }


}

