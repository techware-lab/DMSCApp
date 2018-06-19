import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupEventsPage } from './signup-events';

@NgModule({
  declarations: [
    SignupEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupEventsPage),
  ],
})
export class SignupEventsPageModule {}
