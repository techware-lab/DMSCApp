import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  tabProfile = 'ProfilePage';
  tabDashboard = 'DashboardPage';
  tabSettings = 'SettingsPage';
  myindex: number;
  constructor() {
  }
}
