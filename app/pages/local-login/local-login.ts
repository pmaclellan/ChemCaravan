import {Component} from '@angular/core';
import {NavController, ViewController, Modal, Alert} from 'ionic-angular';
import {SqlService} from '../../providers/services/sql-storage-service';
import {SettlementService} from '../../providers/services/settlement-service';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementPage} from '../settlement-page/settlement-page';
import {Player} from '../../providers/classes/player';


@Component({
  templateUrl: 'build/pages/local-login/local-login.html',
  providers: [SqlService, SettlementService]
})
export class LocalLoginPage {
  private nav: NavController;
  private sqlService: SqlService;
  private settlementService: SettlementService;
  private player: Player;
  private showSignup: Boolean;
  private name: string;

  constructor(nav: NavController, 
              sqlService: SqlService, 
              settlementService: SettlementService) {
    this.nav = nav;
    this.sqlService = new SqlService();
    this.showSignup = false;
    this.player = null;
    this.name = '';

    this.sqlService.loadPlayerState().then((playerState) => {
      console.log('player loaded: ' + playerState);
      //create the Player object if a stored state was successfully retrieved
      if (playerState) {
        let playerShadow = JSON.parse(playerState);
        this.player = new Player(playerShadow.name, playerShadow);
      }
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

  getUserConfirmation() {
    if (this.player != null) {
      this.presentConfirm();
    } else {
      this.newGame();
    }
  }

  newGame() {
    this.sqlService.clearPlayerState();
    this.showSignup = true;
  }

  presentConfirm() {
    let alert = Alert.create({
      title: 'Start New Game?',
      message: 'Your old character will be deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.newGame();
          }
        }
      ]
    });
    this.nav.present(alert);
  }

  createPlayer() {
    this.player = new Player(this.name);
    console.log('player created: ' + this.name);
    this.sqlService.savePlayerState(this.player);
    console.log('player saved');
    this.continue();
  }

  presentInstructionModal() {
    let instructionModal = Modal.create(InstructionModalPage);
    this.nav.present(instructionModal);
  }
}

@Component({
  templateUrl: 'build/pages/local-login/instruction-modal.html'
})
class InstructionModalPage {
  private nav: NavController;
  private viewCtrl: ViewController;

  constructor(nav: NavController, viewCtrl: ViewController) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}