import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/local-login/local-login.html'
})
export class LocalLoginPage {
  private nav: NavController = null;

  constructor(nav: NavController) {
    this.nav = nav;
  }
}