import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LocalLoginPage} from '../local-login/local-login';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private nav: NavController = null;

  constructor(nav:NavController) {
    this.nav = nav;
  }

  goToLocalLogin() {
    console.log('entered goToLocalLogin()')
    this.nav.push(LocalLoginPage);
  }

  goToOnlineLogin() {
    alert("Online version not implemented yet!");
  }
}
