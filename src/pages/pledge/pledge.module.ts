import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PledgePage } from './pledge';

@NgModule({
  declarations: [
    PledgePage,
  ],
  imports: [
    IonicPageModule.forChild(PledgePage),
  ],
})
export class PledgePageModule {}
