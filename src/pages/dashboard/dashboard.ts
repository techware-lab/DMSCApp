import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  activityList;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider) {
    
  }

  ionViewDidLoad() {
    this.service.getActivityList()
    .subscribe(
      restItems => {
        this.activityList = restItems.response;
        console.log(this.activityList);
      }
    );
  }
  

}
