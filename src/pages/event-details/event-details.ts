import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
// import { ProfilePage } from '../profile/profile';
import { TranslateService } from '@ngx-translate/core';
import { AquaBikeFormPage } from '../aqua-bike-form/aqua-bike-form';
import { SailingFormPage } from '../sailing-form/sailing-form';
import { RowingFormPage } from '../rowing-form/rowing-form';
import { FishingFormPage } from '../fishing-form/fishing-form';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public translate: TranslateService,
    public http: HttpClient, public alertCtrl: AlertController, public service: ServiceProvider,
    public loadingCtrl: LoadingController) {
    this.Events = this.navParams.data.event;
  }
  Events;
  EventsPostList;

  ionViewDidLoad() {
    debugger;
    this.Events = this.navParams.data.event;
    this.getEventPostList(this.Events.category_id)
  }
  doRefresh(refresher) {
    this.getEventPostList(this.Events.category_id);

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  ParticipateClick(evnt) {
    if (this.service.loginState) {
      if (this.service.UserDetails.CustomerType === 'RACER') {
        console.log(evnt);
        if (evnt.category_id === '1') {
          this.navCtrl.push(AquaBikeFormPage, evnt);
        } else if (evnt.category_id === '2') {
          this.navCtrl.push(SailingFormPage, evnt);
        }
        else if (evnt.category_id === '3') {
          this.navCtrl.push(RowingFormPage, evnt);
        }
        else if (evnt.category_id === '5') {
          this.navCtrl.push(FishingFormPage, evnt);
        }
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Racer Login Required',
          message: 'Do you want to Login/Register as Racer now?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Login',
              handler: () => {
                this.navCtrl.push(LoginPage);
              }
            }
          ]
        });
        alert.present();
      }
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Login Required',
        message: 'Do you want to Login/Register now?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Login',
            handler: () => {
              this.navCtrl.push(LoginPage);
            }
          }
        ]
      });
      alert.present();
    }
  }
  getEventPostList(id) {
    try {
      let loader = this.loadingCtrl.create({
        content: "Loading Events..."
      });
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
      const arg = { 'event_id': id };
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/eventPosts', arg, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            this.EventsPostList = restItems.response;
            loader.dismissAll();
            console.log(this.EventsPostList);
          }
        );
    }
    catch (ex) { console.log(ex) }
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'x-api-key': '123456' });
    return headers;
  }
}
