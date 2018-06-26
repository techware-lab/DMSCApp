import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RowingFormPage } from './rowing-form';

@NgModule({
  declarations: [
    RowingFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RowingFormPage),
  ],
})
export class RowingFormPageModule {}
