import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PledgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pledge',
  templateUrl: 'pledge.html',
})
export class PledgePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public vwCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.vwCtrl.dismiss();
  }
}
