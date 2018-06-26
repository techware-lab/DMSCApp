import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeesPage } from './fees';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    FeesPage,
  ],
  imports: [
    IonicPageModule.forChild(FeesPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class FeesPageModule {}
