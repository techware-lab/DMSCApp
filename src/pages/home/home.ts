import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  tabProfile = 'ProfilePage';
  tabDashboard = 'DashboardPage';
  tabSettings = 'SettingsPage';
  tabFees = 'FeesPage';
  tabEvents = 'EventsPage';
  tabActivities = 'ActivitiesPage';
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }
}