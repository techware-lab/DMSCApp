import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
import { FileChooser } from '@ionic-native/file-chooser';
// import { FileTransfer } from '@ionic-native/file-transfer';
import { CameraOptions, Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-fishing-form',
  templateUrl: 'fishing-form.html',
})
export class FishingFormPage {
  Events: any;
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

  BoatNumber: any;
  BoatName: any;
  TLID: any;
  TLName: any;
  TLMobile: any;
  TeamName: any;
  BoatOwnerID: any;
  BoatOwner: any;
  BoatOwnerMobile: any;
  Participants: any;
  BoatRegFile: any;
  AllMemberIDFlies: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient,
    // private transfer: FileTransfer,
    private camera: Camera,
    public toastCtrl: ToastController,
    private fileChooser: FileChooser) {
  }

  ionViewDidLoad() {
    this.Events = this.navParams.data;
    this.FishingForm();
  }


  FishingForm() {

    try {
      let loader = this.loadingCtrl.create({
        content: "Loading " + this.Events.training_name + " details..."
      });
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
      const para = {
        'event_category_id': this.Events.category_id, 'event_id': this.Events.post_id, 'customer_id': this.service.UserDetails.CustomerID,
        'customer_type': this.service.UserDetails.CustomerType
      }
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/fishingForm', para, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            loader.dismissAll();
            if (!restItems.status) {
              let alert = this.alertCtrl.create({
                title: this.Events.training_name + ' Booking',
                subTitle: restItems.message,
                buttons: [{
                  text: 'OK', handler: () => {
                  }
                }]
              });
              alert.present();
            } else {
              this.FullName = restItems.response.full_name;
              this.Mobile = restItems.response.mobile_no;
              this.Nationality = restItems.response.nationality;
              this.DOB = restItems.response.date_birth;
              this.Blood = restItems.response.blood_group;
              this.IDNo = restItems.response.id_no;
              this.ACName = restItems.response.account_name;
              this.BankName = restItems.response.bank_name;
              this.ACNumber = restItems.response.account_number;
              this.IBANNumber = restItems.response.iban_number;
              this.SwiftCode = restItems.response.swift_code;
            }
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
  getMembersIds() {
    this.fileChooser.open()
      .then(uri => {
        console.log(uri);
        // this.membersfileURI = uri;
      })
      .catch(e => {
        console.log(e);
        this.presentToast(e);
      });
  }

  SaveFishingForm() {
    debugger;
    let loader = this.loadingCtrl.create({
      content: "Saving " + this.Events.training_name + "..."
    });
    loader.present();
    try {
      const para = {
        'event_category_id': this.Events.category_id, 'event_id': this.Events.post_id,
        'customer_id': this.service.UserDetails.CustomerID,
        'customer_type': this.service.UserDetails.CustomerType,
        'team_leader': this.TLName, 'leader_mobile': this.TLMobile,
        'team_name': this.TeamName, 'boat_number': this.BoatNumber, 'total_member': this.Participants,
        'id_card':this.IDFile
        // 'team_card': [this.membersfileURI]
      }
      const options = {
        headers: this.createAuthorizationHeader()
      };
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/fishingBooking ', para, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            loader.dismissAll();

            let alert = this.alertCtrl.create({
              title: this.Events.training_name + ' Booking',
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

  chooseUserIDCard() {
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
          this.IDFile = uri;
          let base64Image = 'data:image/jpeg;base64,' + uri;
          this.IDFile.push(base64Image);
          loader.dismissAll();
        })
        .catch(e => {
          loader.dismissAll();
          console.log(e);
          this.presentToast(e);
        });
    }
}