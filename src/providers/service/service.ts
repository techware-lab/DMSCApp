import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  public loginState:boolean = false;
  public lang:string ='en';
  public UserDetails ={};
  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    console.log('Hello ServiceProvider Provider');
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
  errorHandler(error: any): void {
    this.presentAlert('Connection Error', error);
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
    this.UserDetails ={};
  }
}
