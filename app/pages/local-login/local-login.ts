import {Page, NavController} from 'ionic-angular';
import {SqlService, Player} from '../../services/sql-storage-service';

@Page({
  templateUrl: 'build/pages/local-login/local-login.html'
})
export class LocalLoginPage {
  private nav: NavController = null;
  private player: Player = null;

  constructor(nav: NavController) {
    this.nav = nav;
    this.player = SqlService.loadPlayerState();
  }

  continue() {
    console.log('continue with player ' + this.player.name);
  }

  startNewGame() {
    SqlService.clearPlayerState();
    console.log('start a new game')
  }
}