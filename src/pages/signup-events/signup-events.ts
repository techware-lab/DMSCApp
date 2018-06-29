import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-signup-events',
  templateUrl: 'signup-events.html',
})
export class SignupEventsPage {

  constructor(public navCtrl: NavController,public translate: TranslateService,    
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,    
    public toastCtrl: ToastController, public http: HttpClient, public navParams: NavParams) {
  }

  FullName: any;
  Mobile: any;
  Nationality: any;
  DOB: any;
  Blood: any;
  IDNo: any;
  IDFile: any;
  ACName: any;
  BankName: any;
  ACNumber: any;
  SwiftCode: any;
  IBANNumber: any;
  Username: string;
  Password: string;

  ionViewDidLoad() {
  }
  RegisterEvents(){
    
    let loader = this.loadingCtrl.create({
      content: "Saving new User for Events..."
    });
    try {
      const para = {
        'emai_id': this.Username, 'password': this.Password,
        'full_name': this.FullName,'mobile_no': this.Mobile,        
        'nationality': this.Nationality, 'member_dob': this.DOB,
        'blood_group': this.Blood, 'd_no': this.IDNo, 'account_name': this.ACName,
        'bank_name': this.BankName, 'account_number': this.ACNumber, 'iban_number': this.IBANNumber
        , 'swift_code': this.SwiftCode

      }
      loader.present();

      const options = {
        headers: this.createAuthorizationHeader()
      };
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/signupEvent ', para, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            loader.dismissAll();

            let alert = this.alertCtrl.create({
              title: 'Registering for Events',
              subTitle: restItems.message,
              buttons: [{
                text: 'OK', handler: () => {
                }
              }]
            });
            alert.present();
          }
        );
    }
    catch (ex) {
      loader.dismissAll();
       console.log(ex); }
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': '123456'
    });
    return headers;
  }
}
