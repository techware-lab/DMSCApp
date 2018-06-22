import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * Generated class for the MyActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-activities',
  templateUrl: 'my-activities.html',
})
export class MyActivitiesPage {
  activitiesList;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,   
    public loadingCtrl: LoadingController,  public service: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyActivitiesPage');
    debugger;
    this.getMyActivities();
  }
  cancelActivity(activity){
    try{
      let loader = this.loadingCtrl.create({
        content: "Canceling your activity..."
      });
      loader.present();
      const options = {
        headers: this.createAuthorizationHeaderCancel(activity.book_id)
      };
  
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/CancelEvent', '', options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            this.activitiesList = restItems.response;
            loader.dismissAll();
            console.log(this.activitiesList);
          }
        );
      }
      catch (ex) { console.log(ex) }
  }

  
  getMyActivities() {
    try{
    let loader = this.loadingCtrl.create({
      content: "Loading your activities..."
    });
    loader.present();
    const options = {
      headers: this.createAuthorizationHeader()
    };
    const param = { 'customer_id':this.service.UserDetails.CustomerID,
    'customer_type':this.service.UserDetails.CustomerType}

    this.http
      .post<any>('http://trendix.qa/dmsc/api/dmsc/MyEvents', param, options)
      .pipe(map(data => data))
      .subscribe(
        restItems => {
          this.activitiesList = restItems.response;
          loader.dismissAll();
          console.log(this.activitiesList);
        }
      );
    }
    catch (ex) { console.log(ex) }
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8',
     'x-api-key': '123456' });
    return headers;
  }
  createAuthorizationHeaderCancel(bookid) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8',
     'x-api-key': '123456', 'customer_id':this.service.UserDetails.CustomerID,
      'customer_type':this.service.UserDetails.CustomerType, 'book_id':bookid });
    return headers;
  }
}
