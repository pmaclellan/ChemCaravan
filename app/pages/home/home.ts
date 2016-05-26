import {Page, NavController} from 'ionic-angular';
import {LocalLoginPage} from '../local-login/local-login';

@Page({
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
