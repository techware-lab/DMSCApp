import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera';

export class Dependent {
  MemberName: any;
  DOB: any; Email: any;
  Mobile: any
}

@IonicPage()
@Component({
  selector: 'page-signup-membership',
  templateUrl: 'signup-membership.html',
})
export class SignupMembershipPage {
  CameraPopoverOptionsCamera
  constructor(public navCtrl: NavController, public translate: TranslateService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public camera: Camera,
    public toastCtrl: ToastController, public http: HttpClient, public navParams: NavParams) {
  }

  FullName: any;
  Mobile: any;
  Nationality: any;
  DOB: any;
  Employer: string;
  Occupation: string;
  PBox: string;
  Dependant = new Dependent();
  MembershipType: any;
  Dependents: Dependent[];
  MemberPhoto: any;
  SpousePhoto: any;
  PrevSailingExp: any;
  TypeOfClass: any;
  PrevSailMembership: any;
  Fax: any;
  MemberImage: any;
  SpouseImage: any;
  ACName: any;
  BankName: any;
  ACNumber: any;
  SwiftCode: any;
  IBANNumber: any;
  Username: string;
  Password: string;
  ionViewDidLoad() {
    this.MembershipType = 'Single';
    this.SpouseImage = 'assets/imgs/avathar-default.png';
    this.MemberImage = 'assets/imgs/avathar-default.png';
    this.Dependents = [this.Dependant];
  }
  RegisterActivities() {

    let loader = this.loadingCtrl.create({
      content: "Saving new User for Activity..."
    });
    try {
      const para = {
        'emai_id': this.Username, 'password': this.Password,
        'full_name': this.FullName, 'mobile_no': this.Mobile,
        'nationality': this.Nationality, 'member_dob': this.DOB,
        'member_type': this.MembershipType, 'sailing_experience': this.PrevSailingExp,
        'type_classes': this.TypeOfClass, 'previous_club': this.PrevSailMembership,
        'member_image': this.MemberImage, 'spouse_image': this.SpouseImage,
        'employer': this.Employer, 'pobox': this.PBox,
        'dependents': this.Dependents
        //  'account_name': this.ACName,
        // 'bank_name': this.BankName, 'account_number': this.ACNumber, 'iban_number': this.IBANNumber
        // , 'swift_code': this.SwiftCode

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
              title: 'Registering for Activities',
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
  }
  createAuthorizationHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': '123456'
    });
    return headers;
  }
  chooseSpousePhoto() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let loader = this.loadingCtrl.create({
      content: "Loading Image.."
    });
    loader.present();
    this.camera.getPicture(options)
      .then(uri => {
        console.log(uri);
        this.SpousePhoto = uri;
        let base64Image = 'data:image/jpeg;base64,' + uri;
        this.SpouseImage = base64Image;
        loader.dismissAll();
      })
      .catch(e => {
        loader.dismissAll();
        console.log(e);
        this.presentToast(e);
      });
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
  chooseMemberPhoto() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let loader = this.loadingCtrl.create({
      content: "Loading Image.."
    });
    loader.present();
    this.camera.getPicture(options)
      .then(uri => {
        console.log(uri);
        this.MemberImage = uri;
        let base64Image = 'data:image/jpeg;base64,' + uri;
        this.MemberImage = base64Image;
        loader.dismissAll();
      })
      .catch(e => {
        loader.dismissAll();
        console.log(e);
        this.presentToast(e);
      });
  }
  AddDependent() {
    debugger;
    this.Dependents.push(this.Dependant);
    this.Dependant =new Dependent();
    // this.Dependant.DOB='';
    // this.Dependant.Email='';
    // this.Dependant.Mobile='';
    // this.Dependant.MemberName='';
  }
  removeDependent(indx) {
    debugger;
    this.Dependents.splice(indx, 1);
  }
}
