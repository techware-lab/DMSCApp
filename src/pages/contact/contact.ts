import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Tabs } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from '../../providers/service/service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  @ViewChild('myTabs') tabRef: Tabs;
  Message: any;
  Subject: any;
  FullName: any;
  Email: any;

  constructor(public navCtrl: NavController, public translate: TranslateService, public service: ServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if (this.tabRef != undefined) {
      this.tabRef.select(0);
    }

  }
  ContactUs() {

    try {
      let loader = this.loadingCtrl.create({
        content: "Sending your Message..."
      });
      loader.present();
      const options = {
        headers: this.createAuthorizationHeader()
      };
      const para = {
        'subject': this.Subject,
        'message': this.Message, 'name': this.FullName, 'email': this.Email
      }
      this.http
        .post<any>('http://trendix.qa/dmsc/api/dmsc/contact', para, options)
        .pipe(map(data => data))
        .subscribe(
          restItems => {
            loader.dismissAll();

            let alert = this.alertCtrl.create({
              title: 'Contact Us',
              subTitle: restItems.message,
              buttons: [{
                text: 'OK', handler: () => {
                  this.Message = "";
                  this.Subject = "";
                  this.FullName = "";
                  this.Email = "";
                }
              }]
            });
            alert.present();
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
}
