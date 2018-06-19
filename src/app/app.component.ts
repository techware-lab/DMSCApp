import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FeesPage } from '../pages/fees/fees';
import { ActivitiesPage } from '../pages/activities/activities';
import { EventsPage } from '../pages/events/events';
import { IntroPage } from '../pages/intro/intro';
import { ProfilePage } from '../pages/profile/profile';
// import { DashboardPage } from '../pages/dashboard/dashboard';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  public modalCtrl: ModalController) {


    this.initializeApp();
    platform.ready().then(() => {
      let splash = modalCtrl.create(IntroPage);
      splash.present();

    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Fees', component: FeesPage, icon: 'cash' },
      { title: 'Activities', component: ActivitiesPage, icon: 'basketball' },
      { title: 'Events', component: EventsPage, icon: 'boat' },
      { title: 'Logout', component: IntroPage, icon: 'log-out' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToProfilePage() {
    this.nav.push(ProfilePage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
