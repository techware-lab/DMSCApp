import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: HttpClient, public alertCtrl: AlertController, public service: ServiceProvider) {
    this.Activity = this.navParams.data.event;
  }
  Activity;
  trainingList;

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
    debugger;
    this.Activity = this.navParams.data.event;
    console.log(this.Activity);
    // this.getTrainingList(this.Activity.category_id);
  }
  ParticipateClick() {
    if (this.service.loginState) {

    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Login Required',
        subTitle: "Please Login/Register for participating this event",
        message: 'Do you want to Login/Register now?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Login/Register',
            handler: () => {
              this.navCtrl.push(ProfilePage);
            }
          }
        ]
      });
      alert.present();
    }
  }
  getTrainingList(id) {
    const options = {
      headers: this.createAuthorizationHeader()
    };
    const arg = { 'event_id': id };
    this.http
      .post<any>('http://trendix.qa/dmsc/api/dmsc/eventDetails', arg, options)
      .pipe(map(data => data))
      .subscribe(
        restItems => {
          this.trainingList = restItems.response;
          console.log(this.trainingList);
        }
      );
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'x-api-key': '123456' });
    return headers;
  }
}
