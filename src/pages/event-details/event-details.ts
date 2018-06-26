import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
import { ProfilePage } from '../profile/profile';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public translate: TranslateService, 
    public http: HttpClient, public alertCtrl: AlertController, public service: ServiceProvider,
     public loadingCtrl: LoadingController ) {
    this.Events = this.navParams.data.event;
  }
  Events;
  EventsPostList;

  ionViewDidLoad() {
    debugger;
    this.Events = this.navParams.data.event;
    this.getEventPostList(this.Events.category_id)
  }
  doRefresh(refresher){
    this.getEventPostList(this.Events.category_id);    

    setTimeout(() => {
      refresher.complete();
    }, 2000);
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
  getEventPostList(id) {
    try{
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
