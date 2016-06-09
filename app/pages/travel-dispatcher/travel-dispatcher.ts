import {Component} from '@angular/core';
import {NavController, NavParams, Modal, ViewController} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementService} from '../../providers/services/settlement-service';
import {ChemService} from '../../providers/services/chem-service';
import {SqlService} from '../../providers/services/sql-storage-service';
import {SettlementPage} from '../settlement-page/settlement-page';
import {EncounterPage} from '../encounter/encounter';

@Component({
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

  ionViewLoaded() {
    this.accrueInterest();
    let selector = Math.random();
    if (selector < 0.05) {
      this.presentChemsFoundModal();
    } else if (selector < 0.06) {
      this.presentMuggedModal();
    } else if (selector < 0.2) {
      this.nav.setRoot(EncounterPage, {
        player: this.player,
        destination: this.destination
      });
    } else {
      this.continueToDestination();
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

  presentChemsFoundModal() {
    let chemsFoundModal = Modal.create(ChemsFoundModalPage, { player: this.player });
    chemsFoundModal.onDismiss((player: Player) => {
      this.player = player;
      this.continueToDestination();
    });
    this.nav.present(chemsFoundModal);
  }
}

@Component({
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

@Component({
  templateUrl: 'build/pages/travel-dispatcher/chems-found-modal.html',
  providers: [SqlService, ChemService]
})
class ChemsFoundModalPage {
  private nav: NavController;
  private navParams: NavParams;
  private viewCtrl: ViewController;
  private player: Player;
  private sqlService: SqlService;
  private chemService: ChemService;
  private chemFound: Chem;
  private quantityFound: number;
  private spaceAvailable: number;

  constructor(nav: NavController, navParams: NavParams,
    viewCtrl: ViewController, sqlService: SqlService, chemService: ChemService) {
    this.nav = nav;
    this.navParams = navParams;
    this.player = this.navParams.get('player');
    this.viewCtrl = viewCtrl;
    this.sqlService = sqlService;
    this.chemService = chemService;
    //determine which chem was found
    let index = Math.floor(Math.random() * this.chemService.numberOfChems());
    this.chemFound = chemService.getChem(index);
    this.chemFound.currentPrice = 0;
    //generate a quantity between 1 and 10, inclusive
    this.quantityFound = Math.floor(Math.random() * 10 + 1);
    this.spaceAvailable = this.player.getAvailableSpace();
  }

  dismiss() {
    if (this.spaceAvailable < this.quantityFound) {
      this.quantityFound = this.spaceAvailable;
    }
    //don't add a 0 value record
    if (this.quantityFound > 0) {
      this.player.inventory.addChem(this.chemFound, this.quantityFound);
      this.sqlService.savePlayerState(this.player);
    }
    this.viewCtrl.dismiss(this.player);
  }
}