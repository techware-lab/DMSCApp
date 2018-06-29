import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceProvider } from '../../providers/service/service';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html',
})
export class MyEventsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public translate: TranslateService,
    public service: ServiceProvider) {
  }
  eventsList;
  ionViewDidLoad() {
    this.getMyEvents();
  }

  getMyEvents() {
    try {
      let loader = this.loadingCtrl.create({
        content: "Loading your events..."
      });
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
      const param = {
        'customer_id': this.service.UserDetails.CustomerID,
        'customer_type': this.service.UserDetails.CustomerType
      }

      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/MyEvents', param, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            this.eventsList = restItems.response;
            loader.dismissAll();
            console.log(this.eventsList);
          }
        );
    }
    catch (ex) { console.log(ex) }
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': '123456'
    });
    return headers;
  }
  cancelEvent(evnt) {
    try {
      let loader = this.loadingCtrl.create({
        content: "Canceling your event..."
      });
      // loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
      const param = {
        'book_id': evnt.booking_id,
        'customer_type': this.service.UserDetails.CustomerType,
        'customer_id': this.service.UserDetails.CustomerID
      }

      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/CancelEvent', param, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            this.eventsList = restItems.response;
            loader.dismissAll();
            const confirm = this.alertCtrl.create({
              title: 'Delete this event?',
              message: 'Do you agree to delete this event?',
              buttons: [
                {
                  text: 'Disagree',
                  handler: () => {
                    this.getMyEvents();
                  }
                },
                {
                  text: 'Agree',
                  handler: () => {
                    let alert = this.alertCtrl.create({
                      title: evnt.training_name + ' Cancellation',
                      subTitle: restItems.message,
                      buttons: [{
                        text: 'OK', handler: () => {
                          this.getMyEvents();
                        }
                      }]
                    });
                    alert.present();
                  }
                }
              ]
            });
            confirm.present();
            
          }
        );
    }
    catch (ex) { console.log(ex) }
  }
}
