import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ActivitiesPage, ModalContentPage } from '../pages/activities/activities';
import { EventsPage } from '../pages/events/events';
import { FeesPage } from '../pages/fees/fees';
// import { DashboardPage } from '../pages/dashboard/dashboard';
import { IntroPage } from '../pages/intro/intro';
import { ServiceProvider } from '../providers/service/service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SignupEventsPage } from '../pages/signup-events/signup-events'
import { SignupMembershipPage } from '../pages/signup-membership/signup-membership'
import { IonicStorageModule } from '@ionic/storage';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { FeesPageModule } from '../pages/fees/fees.module';
import { ActivitiesPageModule } from '../pages/activities/activities.module';
import { EventsPageModule } from '../pages/events/events.module';
import { ContactPage } from '../pages/contact/contact';
// import { DashboardPage } from '../pages/dashboard/dashboard';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
 }
@NgModule({
  declarations: [
    MyApp,
   // ProfilePage,
    ListPage,
    // ActivitiesPage,
    // EventsPage,
    // FeesPage,
    ModalContentPage,
    IntroPage,
    SignupEventsPage,
    SignupMembershipPage,
    EventDetailsPage,
    LoginPage,
    HomePage,
    ContactPage
    // DashboardPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    ProfilePageModule,
    FeesPageModule,
    ActivitiesPageModule,
    EventsPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    ListPage,
    ActivitiesPage,
    EventsPage,
    FeesPage,
    ModalContentPage,
    SignupEventsPage,
    SignupMembershipPage,
    IntroPage,
    EventDetailsPage,
    HomePage,
    LoginPage,    
    ContactPage
    // DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    ActivitiesPage
  ]
})
export class AppModule {
}