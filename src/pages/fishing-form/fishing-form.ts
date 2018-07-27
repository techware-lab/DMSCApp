import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
// import { FileTransfer } from '@ionic-native/file-transfer';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
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
  IDFileShow: any;
  ACName: any;
  BankName: any;
  ACNumber: any;
  SwiftCode: any;
  IBANNumber: any;
  MemberIDList: any = [];
  BoatRegFileList: any;

  BoatNumber: any;
  BoatName: any;
  TLID: any;
  TLName: any;
  TeamName: any;
  BoatOwnerID: any;
  BoatOwner: any;
  BoatOwnerMobile: any;
  Participants: any;
  BoatRegFile: any;
  AllMemberIDFlies: any;
  BoatRegFileShow: string;
  MemberIDFile: any;
  MemberIDFileShow: string;
  Agree: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient,
    // private transfer: FileTransfer,
    private camera: Camera, private imgPicker: ImagePicker,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.Events = this.navParams.data;
    this.MemberIDList = [];
    this.Agree = false;
    this.BoatRegFileShow = 'assets/imgs/noimage.jpg';
    this.IDFileShow = 'assets/imgs/noimage.jpg';
    this.FishingForm();
  }
changeParticipatns(e){
  this.MemberIDList = [];
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
        'event_category_id': this.Events.category_id, 'event_id': this.Events.post_id,
        'customer_id': this.service.UserDetails.CustomerID,
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
    const options = {
      maximumImagesCount: this.Participants,
      quality: 100
    }
    this.imgPicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        let base64Image = 'data:image/jpeg;base64,' + results[i];

        this.MemberIDList.push({ 'IdFileb64': base64Image, 'IDFile': results[i] });
      }
    }, (err) => {
      this.presentToast(err)
    });
  }


  getBoatIds() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      // destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let loader = this.loadingCtrl.create({
      content: "Loading Image.."
    });
    loader.present();
    this.camera.getPicture(options)
      .then(uri => {
        let base64Image = 'data:image/jpeg;base64,' + uri;
        this.BoatRegFile = uri;
        this.BoatRegFileShow = base64Image;
        loader.dismissAll();
      })
      .catch(e => {
        loader.dismissAll();
        console.log(e);
        this.presentToast(e);
      });
  }
  addMemberFile() {
    this.MemberIDList.push({ 'IdFileb64': this.MemberIDFileShow, 'IDFile': this.MemberIDFile });
  }

  SaveFishingForm() {
    debugger;
    let loader = this.loadingCtrl.create({
      content: "Saving " + this.Events.training_name + "..."
    });
    let validationMessage: string = '';
    if (this.BoatNumber === undefined || this.BoatNumber === '') {
      validationMessage = 'Boat Number required.';
    } else if (this.BoatName === undefined || this.BoatName === '') {
      validationMessage = 'Boat Name required.';
    } else if (this.TLName === undefined || this.TLName === '') {
      validationMessage = 'Team Leader Name required.';
    } else if (this.TLID === undefined || this.TLID === '') {
      validationMessage = 'Team Leader ID required.';
    } else if (this.BoatOwner === undefined || this.BoatOwner === '') {
      validationMessage = 'Owner Name required.';
    } else if (this.BoatOwnerMobile === undefined || this.BoatOwnerMobile === '') {
      validationMessage = 'Owner Number required.';
    } else if (this.BoatOwnerID === undefined || this.BoatOwnerID === '') {
      validationMessage = 'Owner ID required.';
    } else if (this.Participants === undefined || this.Participants === '') {
      validationMessage = 'Number of participants required.';
    }else if (this.Agree === undefined || !this.Agree) {
      validationMessage = 'Agree Terms and Conditions';
    }
    if (validationMessage === '' || validationMessage === undefined) {
      loader.present();
      try {
        const para = {
          'event_category_id': this.Events.category_id, 'event_id': this.Events.post_id,
          'customer_id': this.service.UserDetails.CustomerID, 'owner_mobile': this.BoatOwnerMobile,
          'customer_type': this.service.UserDetails.CustomerType, 'leader_id': this.TLID,
          'boat_owner': this.BoatOwner,
          'team_leader': this.TLName, 'owner_id': this.BoatOwnerID, 'boat_name': this.BoatName,
          'boat_number': this.BoatNumber, 'total_member': this.Participants,
          'id_card': this.IDFile, 'boat_reg': this.BoatRegFile,
          'account_name': this.ACName, 'bank_name': this.BankName, 'account_number': this.ACNumber,
          'pan_no': this.IBANNumber, 'swift_code': this.SwiftCode,
          'team_card': this.MemberIDList
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
        console.log(ex);
      }
    }
    else {
      this.presentToast(validationMessage);
    }
  }

  chooseUserIDCard() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let loader = this.loadingCtrl.create({
      content: "Loading Image.."
    });
    loader.present();
    this.camera.getPicture(options)
      .then(uri => {
        this.IDFile = uri;
        let base64Image = 'data:image/jpeg;base64,' + uri;
        this.IDFileShow = base64Image;
        loader.dismissAll();
      })
      .catch(e => {
        loader.dismissAll();
        console.log(e);
        this.presentToast(e);
      });
  }
  chooseMemberIDCard() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let loader = this.loadingCtrl.create({
      content: "Loading Image.."
    });
    loader.present();
    this.camera.getPicture(options)
      .then(uri => {
        this.MemberIDFile = uri;
        let base64Image = 'data:image/jpeg;base64,' + uri;
        this.MemberIDFileShow = base64Image;
        loader.dismissAll();
      })
      .catch(e => {
        loader.dismissAll();
        console.log(e);
        this.presentToast(e);
      });
  }
}
