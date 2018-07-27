import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public translate: TranslateService, public service: ServiceProvider) {
    if (this.service.lang === undefined || this.service.lang !== 'ar') {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
    else {
      this.translate.setDefaultLang(this.service.lang);
      this.translate.use(this.service.lang);
    }
  }
  switchLanguage() {
    this.translate.use(this.service.lang);
  }

  ionViewDidLoad() {
    if (this.tabRef != undefined) {
      this.tabRef.select(0);
    }
  }

}
