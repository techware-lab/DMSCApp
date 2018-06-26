import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FishingFormPage } from './fishing-form';

@NgModule({
  declarations: [
    FishingFormPage,
  ],
  imports: [
    IonicPageModule.forChild(FishingFormPage),
  ],
})
export class FishingFormPageModule {}
