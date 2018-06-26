import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
import { EventDetailsPage } from '../event-details/event-details';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  eventList;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,   
    public loadingCtrl: LoadingController, public translate: TranslateService,   public service: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.getEvents();
  }

  goToEventsDetails(evtId) {
    this.navCtrl.push(EventDetailsPage,{event: evtId});
  }
  getEvents() {
    try{
    let loader = this.loadingCtrl.create({
      content: "Loading Events..."
    });
    loader.present();
    const options = {
      headers: this.createAuthorizationHeader()
    };

    this.http
      .post<any>('http://trendix.qa/dmsc/api/dmsc/events', '', options)
      .pipe(map(data => data))
      .subscribe(
        restItems => {
          this.eventList = restItems.response;
          loader.dismissAll();
          console.log(this.eventList);
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
