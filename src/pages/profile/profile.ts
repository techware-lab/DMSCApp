import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SignupEventsPage } from '../signup-events/signup-events'
import { SignupMembershipPage } from '../signup-membership/signup-membership'
import { Storage } from '@ionic/storage';
// import { MyApp } from '../../app/app.component';
import { LoginPage } from '../login/login';
import { ServiceProvider } from '../../providers/service/service';
import { MyEventsPage } from '../my-events/my-events';
import { MyActivitiesPage } from '../my-activities/my-activities';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordPage } from '../change-password/change-password';

@IonicPage()


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  LoggedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public storage: Storage, public translate: TranslateService, public service: ServiceProvider,
    private popoverCtrl: PopoverController) {
  }
  goToSignupMembershipPage() {
    this.navCtrl.push(SignupMembershipPage);
  }
  goToSignupEventsPage() {
    this.navCtrl.push(SignupEventsPage);
  }
  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }
  goToChangePasswordPage() {
    this.navCtrl.push(ChangePasswordPage);
  }
  gotoMyEvents() {
    this.navCtrl.push(MyEventsPage);
  }

  gotoMyactivities() {
    this.navCtrl.push(MyActivitiesPage);
  }
  ionViewDidLoad() {
    try {
      this.storage.set('LoggedIn', this.service.loginState);
      this.storage.get('LoggedIn').then((val) => {
        this.LoggedIn = val;
      });
    }
    catch (ex) { console.log(ex) }
  }
  presentPopover() {
    const popover = this.popoverCtrl.create(ProfileActionPage);
    popover.present();

  }
}
@Component({
  template: `     
    <ion-list>
    <button class="nav-btn" menuClose ion-item >
      <ion-icon name="lock"></ion-icon>
      {{"changePassword" | translate}}
    </button>
  </ion-list>
  <ion-list>
  <button class="nav-btn" menuClose ion-item >
  <ion-icon name="boat"></ion-icon>
  {{"myEvents" | translate}}
  </button>
  </ion-list>
  <ion-list>
  <button class="nav-btn" menuClose ion-item >
  <ion-icon name="cog"></ion-icon>
  {{"language" | translate}}
  </button>
  </ion-list>
  <ion-list>
  <button class="nav-btn" menuClose ion-item >
  <ion-icon name="log-out"></ion-icon>
  {{"logout" | translate}}
  </button>
  </ion-list>
  
  
  `
})
export class ProfileActionPage {


  constructor() {

  }

  ngOnInit() {

  }
}
