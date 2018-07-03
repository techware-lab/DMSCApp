import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-signup-events',
  templateUrl: 'signup-events.html',
})
export class SignupEventsPage {
  NationlaityList: any;

  constructor(public navCtrl: NavController, public translate: TranslateService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public service: ServiceProvider,
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
    let loader = this.loadingCtrl.create({
      content: "Loading.."
    });
    loader.present();
    this.service.getCountryList().pipe(map(data => data))
      .subscribe(
        restItems => {
          this.NationlaityList = restItems.response;
          loader.dismissAll();
          console.log(this.NationlaityList);
        }
      );
  }
  RegisterEvents() {

    let loader = this.loadingCtrl.create({
      content: "Saving new User for Events..."
    });
    let validationMessage: string = '';
    if (this.Username === '' || this.Username === undefined) {
      validationMessage = 'Username required.'
    }else if (!this.service.isEmail(this.Username)) {
      validationMessage = 'Username Invalid.'
    }  else if (this.Password == '' || this.Password === undefined) {
      validationMessage = 'Password required.'
    } else if (this.FullName == '' || this.FullName === undefined) {
      validationMessage = 'FullName required.'
    } else if (this.Mobile == '' || this.Mobile === undefined) {
      validationMessage = 'Mobile required.'
    } else if (this.Nationality == '' || this.Nationality === undefined) {
      validationMessage = 'Nationality required.'
    } else if (this.Blood == '' || this.Blood === undefined) {
      validationMessage = 'Blood required.'
    } else if (this.IDNo == '' || this.IDNo === undefined) {
      validationMessage = 'ID No required.'
    }
    if (validationMessage === '' || validationMessage === undefined) {
      try {
        const para = {
          'emai_id': this.Username, 'password': this.Password,
          'full_name': this.FullName, 'mobile_no': this.Mobile,
          'nationality': this.Nationality, 'member_dob': this.DOB,
          'blood_group': this.Blood, 'id_no': this.IDNo, 'account_name': this.ACName,
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
        console.log(ex);
      }
    } else {
      let alert = this.alertCtrl.create({
        title: 'Registering for Events',
        subTitle: validationMessage,
        buttons: [{
          text: 'OK', handler: () => {
          }
        }]
      });
      alert.present();
    }
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': '123456'
    });
    return headers;
  }
}
