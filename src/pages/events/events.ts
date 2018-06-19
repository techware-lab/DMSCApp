import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  eventList;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
    public service: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.getEvents();
  }

  getEvents() {
    const options = {
      headers: this.createAuthorizationHeader()
    };

    this.http
      .post<any>('http://trendix.qa/dmsc/api/dmsc/events', '', options)
      .pipe(map(data => data))
      .subscribe(
        restItems => {
          this.eventList = restItems.response;
          console.log(this.eventList);
        }
      );
  }

  createAuthorizationHeader() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'x-api-key': '123456' });
    return headers;
  }
}
