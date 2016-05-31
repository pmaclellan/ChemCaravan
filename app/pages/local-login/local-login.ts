import {Page, NavController} from 'ionic-angular';
import {SqlService} from '../../providers/services/sql-storage-service';
import {SettlementService} from '../../providers/services/settlement-service';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementPage} from '../settlement-page/settlement-page';
import {Player} from '../../providers/classes/player';


@Page({
  templateUrl: 'build/pages/local-login/local-login.html',
  providers: [SqlService, SettlementService]
})
export class LocalLoginPage {
  private nav: NavController;
  private sqlService: SqlService;
  private settlementService: SettlementService;
  private player: Player;
  private showSignup: Boolean;

  constructor(nav: NavController, 
              sqlService: SqlService, 
              settlementService: SettlementService) {
    this.nav = nav;
    this.sqlService = new SqlService();
    this.showSignup = false;

    this.sqlService.loadPlayerState().then((player) => {
      console.log('player loaded: ' + player);
      this.player = (player) ? JSON.parse(player) : player;
    }, function(error) {
      console.error('Failed to load player state', error);
    });

    this.settlementService = new SettlementService();
  }

  continue() {
    let last_known_whereabouts = this.player.location;
    let player_location = this.settlementService.getSettlement(last_known_whereabouts);
    // pass the loaded player state to initialize the settlement
    this.nav.setRoot(SettlementPage, {
      player: this.player,
      settlement: player_location
    });
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
    this.continue();
  }
}