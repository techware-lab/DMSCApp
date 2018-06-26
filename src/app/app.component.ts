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
import { ServiceProvider } from '../providers/service/service';
import { ContactPage } from '../pages/contact/contact';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { TranslateService } from '@ngx-translate/core';
// import { DashboardPage } from '../pages/dashboard/dashboard';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage;

  pages: Array<{ title: string, component: any, icon: string, index: number }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public modalCtrl: ModalController, public service: ServiceProvider, public translate: TranslateService) {

    try {
      this.initializeApp();
      platform.ready().then(() => {
        let splash = modalCtrl.create(IntroPage);
        splash.present();
        // if (this.service.loginState) {

        //   this.rootPage = HomePage;
        // } else {
        //   this.rootPage = ProfilePage;
        // }
        // this.nav.setRoot(DashboardPage);
        this.rootPage = HomePage;
      });
    }
    catch (ex) { console.log(ex) }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'home', component: HomePage, icon: 'home', index: 0 },
      { title: 'fees', component: FeesPage, icon: 'cash', index: 1 },
      { title: 'activities', component: ActivitiesPage, icon: 'basketball', index: 2 },
      { title: 'events', component: EventsPage, icon: 'boat', index: 3 },
      { title: 'contactUs', component: ContactPage, icon: 'contacts', index: 4 },
      { title: 'settings', component: SettingsPage, icon: 'cog', index: 5 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
    });
  }

  goToProfilePage() {
    this.nav.push(ProfilePage);
  }
  goToLoginPage() {
    this.nav.push(LoginPage);
  }
  openPage(page) {
    // debugger;
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNavs() && page.index != undefined) {
      debugger;
      // this.nav.getActiveChildNavs();
    }
    else {
     this.nav.setRoot(page.component, params);
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
