import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class ServiceProvider {
  public loginState:boolean = false;
  public lang:string ='en';
  public UserDetails :{CustomerID: string,CustomerType:string, FullName:string, Image:string };
  constructor(public http: HttpClient,public toastCtrl: ToastController,  private alertCtrl: AlertController) {
   // console.log('Hello ServiceProvider Provider');
  }

  createAuthorizationHeader() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8', 'x-api-key':'123456'} );
    return headers;
  }
  getActivityList(): Observable<any> {
    const options = {
      headers: this.createAuthorizationHeader()
    };
    return this.http.post('http://trendix.qa/dmsc/api/dmsc/activivties', '', options)
    .pipe(map(data => data))
    .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }
  getCountryList(): Observable<any> {
    const options = {
      headers: this.createAuthorizationHeader()
    };
    return this.http.get('http://trendix.qa/dmsc/api/dmsc/getCountry', options)
    .pipe(map(data => data))
    .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }
  errorHandler(error: any): void {
    console.log(error);
    this.presentToast('No Internet Connections.');
  }
  
  presentAlert(_title, _subTitle) {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  logout(){
    debugger;
    this.loginState =false;
    this.UserDetails =null;
  }
  
  isEmail(search:string):boolean
  {
      var  serchfind:boolean;

      let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

      serchfind = regexp.test(search);

      return serchfind
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
