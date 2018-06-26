import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AquaBikeFormPage } from './aqua-bike-form';

@NgModule({
  declarations: [
    AquaBikeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AquaBikeFormPage),
  ],
})
export class AquaBikeFormPageModule {}
