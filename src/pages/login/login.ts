import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  Password: string = '';
  Username: string = '';
  loginStatus;
  loginMessage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpClient, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public service: ServiceProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Login() {
    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();
    const options = {
      headers: this.createAuthorizationHeader()
    };
    debugger;
    // const arg = { 'username': this.Username, 'password': this.Password };
    const formData = new FormData();
    formData.append('username', this.Username);
    formData.append('password', this.Password);
    this.http
      .post<any>('http://trendix.qa/dmsc/api/dmsc/login', formData, options)
      .pipe(map(data => data))
      .subscribe(
        restItems => {
          debugger;
          this.loginMessage = restItems.message;
          console.log(this.loginStatus);
          loader.dismissAll();
          this.loginStatus = restItems.status;
          if (restItems.status) {
            this.service.UserDetails = {
              CustomerID: restItems.response.member_id,
              CustomerType: restItems.response.customer_type,
              Image: restItems.response.member_img, FullName: restItems.response.full_name
            };
            this.service.loginState = restItems.status;
            this.navCtrl.push(HomePage);
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Login Error',
              subTitle: restItems.message,
              buttons: ['OK']
            });
            alert.present();
          }
        }
      );
  }

  goToHomePage() {
    this.navCtrl.push(ProfilePage);
  }
  ForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA',
      'x-api-key': '123456'
    });
    return headers;
  }
}

export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpClient, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public service: ServiceProvider) {
    this.Logout();
  }
  Logout() {
    this.service.loginState = false;
    this.navCtrl.push(LoginPage);
  }

}