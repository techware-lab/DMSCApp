import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, App } from 'ionic-angular';
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
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { MyEventsPage } from '../pages/my-events/my-events';
import { MyActivitiesPage } from '../pages/my-activities/my-activities';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage;

  pages: Array<{ title: string, component: any, icon: string, index?: number, pageName?: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public app: App,
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
      { title: 'home', pageName: HomePage, component: HomePage, icon: 'home', index: 0 },
      { title: 'events', pageName: EventsPage, component: EventsPage, icon: 'boat', index: 1 },
      { title: 'activities', pageName: ActivitiesPage, component: ActivitiesPage, icon: 'basketball', index: 2 },
      { title: 'fees', pageName: HomePage, component: FeesPage, icon: 'cash', index: 0 },
      { title: 'settings', pageName: HomePage, component: SettingsPage, icon: 'cog', index: 0 },
      { title: 'contactUs', pageName: ContactPage, component: ContactPage, icon: 'contacts', index: 3 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
      this.nav.setRoot(HomePage);
    });
  }

  goToProfilePage() {
    this.nav.push(ProfilePage);
  }
  goToLoginPage() {
    this.nav.push(LoginPage);
  }
  openPage(page) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
    else { params = { tabIndex: 0 }; }
    // If tabs page is already active just change the tab index
    if (this.nav.getActiveChildNavs().length && page.index != undefined && page.index > 0) {      
      this.nav.getActiveChildNavs()[0].select(page.index);
    }
    else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      // this.nav.getActiveChildNavs()[0].select(0);
      // this.nav.setRoot(page.component, params);
      // this.app.getRootNav().setRoot(page.component, params);
      // this.rootPage = HomePage;
      this.nav.setRoot(page.component, params);
    }
  }

  goToChangePasswordPage() {
    this.nav.push(ChangePasswordPage);
  }
  gotoMyEvents() {
    this.nav.push(MyEventsPage);
  }

  gotoMyactivities() {
    this.nav.push(MyActivitiesPage);
  }
}
