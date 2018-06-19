import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,public service: ServiceProvider,
    public modalCtrl: ModalController) {
  }
  activityList;
  activity;
  openModal(characterNum) {
    this.activity = this.activityList.filter(x=> x.category_id == characterNum.charNum)[0];
    console.log(this.activity);
    let modal = this.modalCtrl.create(ModalContentPage, this.activity);
    modal.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
    this.getActivities();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getActivities();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  getActivities() {
    const options = {
      headers: this.createAuthorizationHeader()
    };

    this.http
      .post<any>('http://trendix.qa/dmsc/api/dmsc/activivties', '', options)
      .pipe(map(data => data))
      .subscribe(
        restItems => {
          this.activityList = restItems.response;
          console.log(this.activityList);
        }
      );
  }

  createAuthorizationHeader() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'x-api-key': '123456' });
    return headers;
  }
}
@Component({
  templateUrl: 'activityDetails.html'
})
export class ModalContentPage {
  Activity;
trainingList;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public http: HttpClient
  ) {
    this.Activity = this.params.data;
  }

  ionViewDidLoad() {
    this.Activity = this.params.data;
    this.getTrainingList(this.params.data.category_id);
  }

  getTrainingList(id) {
    const options = {
      headers: this.createAuthorizationHeader()
    };
const arg = {'activity_id':id};
    this.http
      .post<any>('http://trendix.qa/dmsc/api/dmsc/activityTraining', arg, options)
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

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
