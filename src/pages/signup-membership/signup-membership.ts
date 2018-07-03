import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ToastController,
  LoadingController, AlertController, Platform, ActionSheetController
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { ServiceProvider } from '../../providers/service/service';
import { File } from '@ionic-native/file';
// import { Transfer } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export class Dependent {
  MemberName: any;
  DOB: any; Email: any;
  Mobile: any
}
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-signup-membership',
  templateUrl: 'signup-membership.html',
})
export class SignupMembershipPage {
  lastImageSpouse: string = null;
  lastImageMember: string = null; 
  public SignupMembership : FormGroup;
  public DepandantForm : FormGroup;
  constructor(public navCtrl: NavController, public translate: TranslateService, public service: ServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public camera: Camera,
    public toastCtrl: ToastController, public http: HttpClient, public navParams: NavParams
    , private imagePicker: ImagePicker, public actionSheetCtrl: ActionSheetController,
    private base64: Base64,  // private transfer: Transfer, 
    private file: File, // private filePath: FilePath,
    public platform: Platform, private formBuilder: FormBuilder
  ) {
    this.SignupMembership = this.formBuilder.group({
      FullName: ['', Validators.required],
      Mobile: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      Nationality: ['', Validators.required],
      Employer: ['', Validators.required],
      Occupation: ['', Validators.required],
      PBox: ['', Validators.required],
      Fax: ['', Validators.required],
      MembershipType: ['', Validators.required],
      DOB: ['', Validators.required],
      MemberPhoto: ['', Validators.required],
      TypeOfClass: ['', Validators.required],
      Username: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.required],
      PrevSailingExp: [''],
      PrevSailMembership: [''],
      SpousePhoto: [''],
    });
    this.DepandantForm = this.formBuilder.group({
      MemberName:['', Validators.required],
      DOB:['', Validators.required],
      Email:['', Validators.compose([Validators.required, Validators.email])],
      Mobile:['', Validators.compose([Validators.required, Validators.minLength(10)]) ],
    });

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

  NationlaityList: any;
  ionViewDidLoad() {
    this.MembershipType = 'Single';
    this.SpouseImage = 'assets/imgs/avathar-default.png';
    this.MemberImage = 'assets/imgs/avathar-default.png';
    this.Dependents = [this.Dependant];
    this.Dependents.splice(0, 1);
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
  RegisterActivities() {

    let loader = this.loadingCtrl.create({
      content: "Saving new User for Activity..."
    });
    try {
      const para = {
        'emai_id': this.SignupMembership.controls['Username'].value, 'password': this.SignupMembership.controls['Password'].value,
        'full_name': this.SignupMembership.controls['FullName'].value  , 'mobile_no': this.SignupMembership.controls['Mobile'].value,
        'nationality': this.Nationality, 'member_dob':  this.SignupMembership.controls['DOB'].value,
        'member_type': this.SignupMembership.controls['MembershipType'].value, 'sailing_experience': this.SignupMembership.controls['PrevSailingExp'].value ,
        'type_classes': this.SignupMembership.controls['TypeOfClass'].value, 'previous_club': this.SignupMembership.controls['PrevSailMembership'].value,
        'member_image': this.SignupMembership.controls['MemberPhoto'].value, 'spouse_image': this.SignupMembership.controls['SpousePhoto'].value,
        'employer': this.SignupMembership.controls['Employer'].value, 'pobox': this.SignupMembership.controls['PBox'].value,'occupation': this.SignupMembership.controls['Occupation'].value,
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

    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // }
    let loader = this.loadingCtrl.create({
      content: "Loading Image.."
    });
    loader.present();
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.SpouseImage = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.SpousePhoto = base64File;
        }, (err) => {
          loader.dismissAll();
          console.log(err);
          this.presentToast(err);
        });
      }

      loader.dismissAll();
    }, (err) => {
      this.presentToast(err);
      loader.dismissAll();
    });



    // this.camera.getPicture(options)
    //   .then(uri => {
    //     console.log(uri);
    //     this.SpousePhoto = uri;
    //     let base64Image = 'data:image/jpeg;base64,' + uri;
    //     this.SpouseImage = base64Image;
    //     loader.dismissAll();
    //   })
    //   .catch(e => {
    //     loader.dismissAll();
    //     console.log(e);
    //     this.presentToast(e);
    //   });
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
    let loader = this.loadingCtrl.create({
      content: "Loading Image.."
    });
    loader.present();
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.MemberImage = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.MemberPhoto = base64File;
        }, (err) => {
          loader.dismissAll();
          this.presentToast(err);
          console.log(err);
        });
      }

      loader.dismissAll();
    }, (err) => {
      this.presentToast(err);
      loader.dismissAll();
    });
  }
  AddDependent() {
    debugger;
    this.Dependant.DOB = this.DepandantForm.controls['DOB'].value;
    this.Dependant.MemberName = this.DepandantForm.controls['MemberName'].value;
    this.Dependant.Mobile = this.DepandantForm.controls['Mobile'].value;
    this.Dependant.Email = this.DepandantForm.controls['Email'].value;
    this.Dependents.push(this.Dependant);
    this.Dependant = new Dependent();
    // this.Dependant.DOB='';
    // this.Dependant.Email='';
    // this.Dependant.Mobile='';
    // this.Dependant.MemberName='';
  }
  removeDependent(indx) {
    debugger;
    this.Dependents.splice(indx, 1);
  }
  public presentActionSheet(type) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,type);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA,type);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType,type) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      //   this.filePath.resolveNativePath(imagePath)
      //     .then(filePath => {
      //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
      //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      //     });
      // } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),type);
      // }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }// Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName,type) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
     if(type==='Spouse'){
      this.lastImageSpouse = newFileName;

     }else{
      this.lastImageMember = newFileName;
    }
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }


  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
}
