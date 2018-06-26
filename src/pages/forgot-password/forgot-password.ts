import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ServiceProvider } from '../../providers/service/service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,    public translate: TranslateService, 
    public loadingCtrl: LoadingController,  public service: ServiceProvider, public alertCtrl: AlertController) {
  }
  response;
  Username;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

    GetPassord() {
      try{
      let loader = this.loadingCtrl.create({
        content: "Fetching Password..."
      });
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
  const para ={'email_id':this.Username}
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/forgotpassword', para, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            loader.dismissAll();
            
            let alert = this.alertCtrl.create({
              title: 'Password',
              subTitle: restItems.message,
              buttons: ['OK']
            });
            alert.present();
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
}
