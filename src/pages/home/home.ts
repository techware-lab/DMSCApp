import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
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
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }
}