import {Page, NavController} from 'ionic-angular';
import {SqlService, Player} from '../../services/sql-storage-service';

@Page({
  templateUrl: 'build/pages/local-login/local-login.html'
})
export class LocalLoginPage {
  private nav: NavController;
  private sqlService: SqlService;
  private player: any;
  private showSignup: Boolean;

  constructor(nav: NavController, sqlService: SqlService) {
    this.nav = nav;
    this.sqlService = new SqlService();
    this.player = this.sqlService.loadPlayerState();
    this.showSignup = false;
  }

  continue() {
    console.log('continue with player ' + this.player.name);
    this.sqlService.loadPlayerState();
  }

  startNewGame() {
    //TODO: a warning popup would be nice here
    this.sqlService.clearPlayerState();
    console.log('start a new game')
    this.showSignup = true;
  }

  createPlayer(name: string) {
    this.player = new Player(name);
    console.log('player created: ' + name);
    this.sqlService.savePlayerState(this.player);
    console.log('player saved');
  }
}