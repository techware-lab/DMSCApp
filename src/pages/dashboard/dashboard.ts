import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { ModalContentPage } from '../activities/activities';
import { ProfilePage } from '../profile/profile';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  activity;
  activityList;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,
    public translate: TranslateService, public modalCtrl: ModalController) {

      this.translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    try {
      this.service.getActivityList()
        .subscribe(
          restItems => {
            this.activityList = restItems.response;
            console.log(this.activityList);
          }
        );
    }
    catch (ex) { console.log(ex) }
  }

  goToProfilePage() {
    this.navCtrl.push(ProfilePage);
  }
  openModal(characterNum) {
    this.activity = this.activityList.filter(x => x.category_id == characterNum.charNum)[0];
    console.log(this.activity);
    // let modal = this.modalCtrl.create(ModalContentPage, this.activity);
    // modal.present();    
    this.navCtrl.push(ModalContentPage, this.activity);
  }

}
