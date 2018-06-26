import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SailingFormPage } from './sailing-form';

@NgModule({
  declarations: [
    SailingFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SailingFormPage),
  ],
})
export class SailingFormPageModule {}
