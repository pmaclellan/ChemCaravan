import {Page, NavController, NavParams, Modal, ViewController} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementService} from '../../providers/services/settlement-service';
import {ChemService} from '../../providers/services/chem-service';
import {SqlService} from '../../providers/services/sql-storage-service';
import {SettlementPage} from '../settlement-page/settlement-page';

@Page({
  templateUrl: 'build/pages/travel-dispatcher/travel-dispatcher.html',
  providers: [ChemService]
})
export class TravelDispatcherPage {
  private nav: NavController;
  private navParams: NavParams;
  private chemService: ChemService;
  private player: Player;
  private destination: Settlement;
  private messages: string[];
  private message: string;

  constructor(nav: NavController, navParams: NavParams, chemService: ChemService) {
    this.nav = nav;
    this.navParams = navParams;
    this.chemService = chemService;
    this.player = navParams.get('player');
    this.destination = navParams.get('destination');
    this.messages = ["funny message 0", "funny message 1", "funny message 2"];
    let index = Math.floor(Math.random() * this.messages.length);
    this.message = this.messages[index];
  }

  onPageLoaded() {
    this.accrueInterest();
    let selector = Math.random();
    if (selector < 0.5) {
      this.continueToDestination();
    } else if (selector < 0.51) {
      this.presentMuggedModal();
    } else {
      console.log("an event occurred");
      this.nav.setRoot(SettlementPage, {
        player: this.player,
        settlement: this.destination
      });
    }
  }

  accrueInterest() {
    let new_debt = Math.floor(this.player.debt *= 1.01);
    this.player.debt = new_debt;
  }

  continueToDestination() {
    this.nav.setRoot(SettlementPage, {
      player: this.player,
      settlement: this.destination
    });
  }

  presentMuggedModal() {
    let muggedModal = Modal.create(MuggedModalPage, { player: this.player });
    muggedModal.onDismiss((player: Player) => {
      this.player = player;
      this.continueToDestination();
    });
    this.nav.present(muggedModal);
  }
}

@Page({
  templateUrl: 'build/pages/travel-dispatcher/mugged-modal.html',
  providers: [SqlService]
})
class MuggedModalPage {
  private nav: NavController;
  private navParams: NavParams;
  private viewCtrl: ViewController;
  private player: Player;
  private sqlService: SqlService;

  constructor(nav: NavController, navParams: NavParams, 
              viewCtrl: ViewController, sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.player = this.navParams.get('player');
    this.viewCtrl = viewCtrl;
    this.sqlService = sqlService;
  }

  dismiss() {
    this.player.caps = 0;
    this.sqlService.savePlayerState(this.player);
    this.viewCtrl.dismiss(this.player);
  }
}