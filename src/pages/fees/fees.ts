import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the FeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fees',
  templateUrl: 'fees.html',
})
export class FeesPage {

  constructor(public navCtrl: NavController, public translate: TranslateService,
    public vwCntrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeesPage');
  }

  goToHomePage() {
    this.navCtrl.push(ProfilePage);
  }
  closeFees() {
    this.vwCntrl.dismiss();
  }
}
