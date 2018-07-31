import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceProvider } from '../../providers/service/service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { PledgePage } from '../pledge/pledge';


@IonicPage()
@Component({
  selector: 'page-rowing-form',
  templateUrl: 'rowing-form.html',
})
export class RowingFormPage {
  Agree: boolean = false;
  MemberIDList: any;
  MemberIDFileShow: any;
  MemberIDFile: any;
  IDFileShow: string;
  FileNameID: any;
  FileNameMember: any;

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

  TLName: any;
  TeamName: any;
  BoatNumber: any;
  Participants: any;
  TLMobile: any;

  IDFileURI: string;
  membersfileURI: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient,
    //  private transfer: FileTransfer,
    private camera: Camera,public modal:ModalController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.Events = this.navParams.data;
    this.MemberIDList = [];
    this.IDFileShow = 'assets/imgs/noimage.jpg';
    this.AquaBikeForm();
  }

  openPledge(){
    let pledge = this.modal.create(PledgePage);
    pledge.present();
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
        .post<any>('http://trendix.qa/dmsc/api/dmsc/rowingForm', para, options)
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

  changeParticipatns(e) {
    this.MemberIDList = [];
  }
  SaveAquaBikeForm() {
    debugger;
    let validationMessage: string = '';
    if (this.TeamName === undefined || this.TeamName === '') {
      validationMessage = 'Team Name required.';
    } else if (this.BoatNumber === undefined || this.BoatNumber === '') {
      validationMessage = 'Boat Number required.';
    } else if (this.TLName === undefined || this.TLName === '') {
      validationMessage = 'Team Leader Name required.';
    } else if (this.TLMobile === undefined || this.TLMobile === '') {
      validationMessage = 'Team Leader Number required.';
    } else if (this.Participants === undefined || this.Participants === '') {
      validationMessage = 'Number of participants required.';
    } else if (this.IDFile === undefined || this.IDFile === '') {
      validationMessage = 'Member ID Card required.';
    } else if (this.Agree === undefined || !this.Agree) {
      validationMessage = 'Agree Terms and Conditions';
    }
    if (validationMessage === '' || validationMessage === undefined) {
      try {
        const para = {
          'event_category_id': this.Events.category_id, 'event_id': this.Events.post_id,
          'customer_id': this.service.UserDetails.CustomerID,
          'customer_type': this.service.UserDetails.CustomerType,
          'team_leader': this.TLName, 'leader_mobile': this.TLMobile,
          'team_name': this.TeamName, 'boat_number': this.BoatNumber, 'total_member': this.Participants,
          'team_card': this.MemberIDList, 'id_card': this.IDFile,
          'account_name': this.ACName, 'bank_name': this.BankName, 'account_number': this.ACNumber,
          'pan_no': this.IBANNumber, 'swift_code': this.SwiftCode
        }
        let loader = this.loadingCtrl.create({
          content: "Saving " + this.Events.training_name + "..."
        });
        loader.present();
        // const fileTransfer: FileTransferObject = this.transfer.create();

        // let options: FileUploadOptions = {
        //   fileKey: 'ionicfile',
        //   fileName: 'ionicfile',
        //   chunkedMode: false,
        //   mimeType: "image/jpeg",
        //   headers: {}
        // }

        // fileTransfer.upload(this.FileNameID, 'http://192.168.0.7:8080/api/uploadImage', options)
        //   .then((data) => {
        //     console.log(data + " Uploaded Successfully");
        //     this.FileNameID = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
        //     loader.dismiss();
        //     this.presentToast("Image uploaded successfully");
        //   }, (err) => {
        //     console.log(err);
        //     loader.dismiss();
        //     this.presentToast(err);
        //   });

        const options = {
          headers: this.createAuthorizationHeader()
        };
        this.http
          .post<any>('http://trendix.qa/dmsc/api/dmsc/rowingBooking ', para, options)
          .pipe(map(data => data))
          .subscribe(
            restItems => {
              loader.dismissAll();

              let alert = this.alertCtrl.create({
                title: 'Activity Booking',
                subTitle: restItems.message,
                buttons: [{
                  text: 'OK', handler: () => {
                    this.AquaBikeForm();
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

  addMemberFile() {
    this.MemberIDList.push({ 'IdFileb64': this.MemberIDFileShow, 'IDFile': this.MemberIDFile });
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
        this.IDFile = uri;
        let base64Image = 'data:image/jpeg;base64,' + uri;
        this.IDFileShow = base64Image;
      })
      .catch(e => {
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
