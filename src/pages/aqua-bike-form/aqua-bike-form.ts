import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, Platform } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
// import { FileTransfer } from '@ionic-native/file-transfer';
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { EventsPage } from '../events/events';
import { PledgePage } from '../pledge/pledge';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-aqua-bike-form',
  templateUrl: 'aqua-bike-form.html',
})
export class AquaBikeFormPage {

  Agree: boolean = false;
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
  cordova: any;
  CategoryClass: any;
  BikeNumber: any;
  LicenceNumber: any;
  PrevLicenceNumber: any;
  storageDirectory: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient,
    // private transfer: FileTransfer,
    private transfer: FileTransfer, public platform: Platform,
    private camera: Camera, public modal: ModalController,
    public toastCtrl: ToastController, private file: File,
    private fileChooser: FileChooser) {
    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
      else if (this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
      else {
        return false;
      }
    });
  }
  fileTransfer: FileTransferObject = this.transfer.create();
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
    this.IDFile = 'assets/imgs/noimage.jpg';
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
    } else if (this.Agree === undefined || !this.Agree) {
      validationMessage = 'Agree Terms and Conditions';
    }
    if (validationMessage === '' || validationMessage === undefined) {
      try {
        const para = {
          'event_category_id': this.Events.category_id, 'event_id': this.Events.post_id,
          'customer_id': this.service.UserDetails.CustomerID,
          'customer_type': this.service.UserDetails.CustomerType,
          'bike_no': this.BikeNumber, 'license_number': this.LicenceNumber,
          'previous_licensce': this.PrevLicenceNumber, 'category': this.CategoryClass,
          'id_card': this.fileURI,
          'account_name': this.ACName, 'bank_name': this.BankName, 'account_number': this.ACNumber,
          'pan_no': this.IBANNumber, 'swift_code': this.SwiftCode
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
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      // destinationType: this.camera.DestinationType.FILE_URI,
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
  downloadFile() {
    // Some Loading
    this.fileTransfer.download(encodeURI('http://trendix.qa/dmsc/assets_front/form/medical_form.pdf'), this.file.applicationStorageDirectory +
      '/Download/' + 'MedicalForm.pdf').then(response => {
        console.log(response);
        this.presentToast('File has been downloaded to the Downloads folder. View it..')
      })
      .catch(err => {
        console.log(err)
      });
  }
  openPledge() {
    let pledge = this.modal.create(PledgePage);
    pledge.present();
  }
  downloadPdf() {
    let fileURL = '';
    this.platform.ready().then(() => {
      fileURL = 'http://trendix.qa/dmsc/assets_front/form/medical_form.pdf';
      const fileTransfer: FileTransferObject = this.transfer.create();
      const imageName = fileURL.split('/').pop();

      fileTransfer.download(fileURL, this.storageDirectory + imageName).then((entry) => {
        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `${fileURL} was successfully downloaded to: ${entry.toURL()}`,
          buttons: ['Ok']
        });
        alertSuccess.present();
      }, (error) => {
        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `${fileURL} was not successfully downloaded. Error code: ${error.code}`,
          buttons: ['Ok']
        });
        alertFailure.present();
      });
    });
  }
}
