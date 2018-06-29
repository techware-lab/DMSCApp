import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  Username: any;
  OldPassword: any;
  NewPassword: any;
  Message;
  Status = false;

  constructor(public navCtrl: NavController, public translate: TranslateService, public service: ServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ChangePassword() {
    try {
      let loader = this.loadingCtrl.create({
        content: "Changing Password..."
      });
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
      const para = {
        'customer_id': this.service.UserDetails.CustomerID, 'old_password': this.OldPassword,
        'new_password': this.NewPassword
      }
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/changepassword ', para, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            loader.dismissAll();

            let alert = this.alertCtrl.create({
              title: 'Password Reset',
              subTitle: restItems.message,
              buttons: [{
                text: 'OK', handler: () => {
                  this.Message = "";
                  this.Username = "";
                  this.OldPassword = "";
                  this.NewPassword = "";
                  this.Status = false;
                }
              }]
            });
            alert.present();
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

}
