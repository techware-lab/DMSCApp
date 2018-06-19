import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupEventsPage } from '../signup-events/signup-events'
import { SignupMembershipPage } from '../signup-membership/signup-membership'
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  LoggedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }
  goToSignupMembershipPage() {
    this.navCtrl.push(SignupMembershipPage);
  }
  goToSignupEventsPage() {
    this.navCtrl.push(SignupEventsPage);
  }

  ionViewDidLoad() {
    this.storage.set('LoggedIn', true);
    this.storage.get('LoggedIn').then((val) => {
      console.log('Your age is', val);
      this.LoggedIn = val;
    });
    console.log('ionViewDidLoad ProfilePage');
  }

}
