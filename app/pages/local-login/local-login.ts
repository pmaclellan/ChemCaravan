import {Page, NavController} from 'ionic-angular';
import {SqlService, Player} from '../../services/sql-storage-service';

@Page({
  templateUrl: 'build/pages/local-login/local-login.html'
})
export class LocalLoginPage {
  private nav: NavController;
  private sqlService: SqlService;
  private player: any;

  constructor(nav: NavController, sqlService: SqlService) {
    this.nav = nav;
    this.sqlService = new SqlService();
    this.player = this.sqlService.loadPlayerState();
  }

  continue() {
    console.log('continue with player ' + this.player.name);
  }

  startNewGame() {
    this.sqlService.clearPlayerState();
    console.log('start a new game')
  }
}