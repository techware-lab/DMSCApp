import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html',
})
export class MyEventsPage {

  constructor(public navCtrl: NavController, public translate: TranslateService,  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEventsPage');
  }

}
