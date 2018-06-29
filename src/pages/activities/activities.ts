import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
import { TranslateService } from '@ngx-translate/core';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: HttpClient, public service: ServiceProvider,
    public modalCtrl: ModalController, public translate: TranslateService,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }
  activityList;
  activity;
  openModal(characterNum) {
    if(this.service.loginState){
    this.activity = this.activityList.filter(x => x.category_id == characterNum.charNum)[0];
    console.log(this.activity);
    // let modal = this.modalCtrl.create(ModalContentPage, this.activity);
    // modal.present();
    this.navCtrl.push(ModalContentPage, this.activity);
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
    this.getActivities();
  }
  doRefresh(refresher) {
    this.getActivities();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  getActivities() {
      let loader = this.loadingCtrl.create({
        content: "Loading Activities..."
      });
    try {
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };

      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/activivties', '', options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            this.activityList = restItems.response;
            loader.dismissAll();
            console.log(this.activityList);
          }
        );
    }
    catch (ex) {
      loader.dismissAll();
       console.log(ex) }
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
  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: NavController, public viewCtrl: ViewController, public loadingCtrl: LoadingController,
    public http: HttpClient
  ) {
    this.Activity = this.params.data;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    this.Activity = this.params.data;
  }

  navigateTraningList(acticity) {
    this.navCtrl.push(TrainingBookingPage, acticity);
  }
}

@Component({
  templateUrl: 'bookTraning.html'
})
export class TrainingBookingPage {
  trainingList;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController, public loadingCtrl: LoadingController,
    public http: HttpClient,
    public service: ServiceProvider
  ) {
  }
  ionViewDidLoad() {
    this.getTrainingList(this.params.data.category_id);
  }
  getTrainingList(id) {
      let loader = this.loadingCtrl.create({
        content: "Loading Training Schedules..."
      });
    try {
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
      const arg = { 'activity_id': id };
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/activityTraining', arg, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            this.trainingList = restItems.response;
            loader.dismissAll();
          }
        );
    }
    catch (ex) { 
      loader.dismissAll();
      console.log(ex);}
  }

  BookActivity(training) {
    let loader = this.loadingCtrl.create({
      content: "Booking your Activity..."
    });
    try {
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
      const param = {
        'training_id': training.training_id,
        'customer_id': this.service.UserDetails.CustomerID,
        'customer_type': this.service.UserDetails.CustomerType
      }
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/activityBookingRequest', param, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            loader.dismissAll();
            this.service.presentAlert('Activity Booking', restItems.response);
            console.log(restItems.response);
          }
        );
    }
    catch (ex) {
      loader.dismissAll();
      console.log(ex);
    }
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'x-api-key': '123456' });
    return headers;
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}