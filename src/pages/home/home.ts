import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  tabDashboard = 'DashboardPage';
  // tabSettings = 'SettingsPage';
  tabEvents = 'EventsPage';
  tabActivities = 'ActivitiesPage';
  tabContact = 'ContactPage';
  tabFees = 'FeesPage';
  tabSettings = 'SettingsPage';
  @ViewChild(Tabs) tabs;
  myIndex: number;

  constructor(public navCtrl: NavController,public translate: TranslateService,
     public navParams: NavParams) {
    
    this.translate.setDefaultLang('en');
    this.myIndex = navParams.data.tabIndex || 0;
  }
  // private firstLoaded: boolean = false;
  ionViewDidEnter() {
      // if (!this.firstLoaded && this.tabs.getSelected()!= null && this.tabs.getSelected().length() >= 2) {
      //     this.tabs.getSelected().remove(0, this.tabs.getSelected().length() - 1);
      // }
      // this.firstLoaded = true;
  }
}