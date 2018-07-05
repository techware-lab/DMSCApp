import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
// import { FileTransfer } from '@ionic-native/file-transfer';
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { EventsPage } from '../events/events';

@IonicPage()
@Component({
  selector: 'page-aqua-bike-form',
  templateUrl: 'aqua-bike-form.html',
})
export class AquaBikeFormPage {

  fileURI: any;
  FileName: any;

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

  CategoryClass: any;
  BikeNumber: any;
  LicenceNumber: any;
  PrevLicenceNumber: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient,
    // private transfer: FileTransfer,
    private camera: Camera,
    public toastCtrl: ToastController,
    private fileChooser: FileChooser) {
  }
  getImage() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   this.fileURI = imageData;
    // }, (err) => {
    //   console.log(err);
    //   this.presentToast(err);
    // });
    this.fileChooser.open()
      .then(uri => {
        console.log(uri);
        this.fileURI = uri;
      })
      .catch(e => {
        console.log(e);
        this.presentToast(e);
      });
  }
  ionViewDidLoad() {
    this.Events = this.navParams.data;
    this.AquaBikeForm();
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

  AquaBikeForm() {

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
        .post<any>('http://trendix.qa/dmsc/api/dmsc/aquaBikeForm', para, options)
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
                    this.navCtrl.push(EventsPage);
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

  SaveAquaBikeForm() {
    debugger;
    let validationMessage: string = '';
    if (this.BikeNumber === undefined || this.BikeNumber === '') {
      validationMessage = 'Bike Number required.';
    } else if (this.LicenceNumber === undefined || this.LicenceNumber === '') {
      validationMessage = 'Licence Number required.';
    } else if (this.CategoryClass === undefined || this.CategoryClass === '') {
      validationMessage = 'Category/Class required.';
    }
    if (validationMessage === '' || validationMessage === undefined) {
      try {
        const para = {
          'event_category_id': this.Events.category_id, 'event_id': this.Events.post_id,
          'customer_id': this.service.UserDetails.CustomerID,
          'customer_type': this.service.UserDetails.CustomerType,
          'bike_no': this.BikeNumber, 'license_number': this.LicenceNumber,
          'previous_licensce': this.PrevLicenceNumber, 'category': this.CategoryClass,
          'id_card': this.IDFile,

        }
        let loader = this.loadingCtrl.create({
          content: "Saving " + this.Events.training_name + "..."
        });
        loader.present();


        const options = {
          headers: this.createAuthorizationHeader()
        };
        this.http
          .post<any>('http://trendix.qa/dmsc/api/dmsc/aquaBikeBooking ', para, options)
          .pipe(map(data => data))
          .subscribe(
            restItems => {
              loader.dismissAll();

              let alert = this.alertCtrl.create({
                title: this.Events.training_name + ' Booking',
                subTitle: restItems.message,
                buttons: [{
                  text: 'OK', handler: () => {
                    // this.AquaBikeForm();
                  }
                }]
              });
              alert.present();
            }
          );
      }
      catch (ex) { console.log(ex) }
    } else {
      this.presentToast(validationMessage);
    }
  }

  chooseUserIDCard() {
    //   const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options)
      .then(uri => {
        console.log(uri);
        this.fileURI = uri;
        let base64Image = 'data:image/jpeg;base64,' + uri;
        this.IDFile = base64Image;
      })
      .catch(e => {
        console.log(e);
        this.presentToast(e);
      });
  }
}
