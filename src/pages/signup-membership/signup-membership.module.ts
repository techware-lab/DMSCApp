import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupMembershipPage } from './signup-membership';

@NgModule({
  declarations: [
    SignupMembershipPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupMembershipPage),
  ],
})
export class SignupMembershipPageModule {}
