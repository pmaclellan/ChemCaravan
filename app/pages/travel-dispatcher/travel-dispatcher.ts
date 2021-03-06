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
import {LocalLoginPage} from '../local-login/local-login';

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
  private chemsFoundChance: number = 0.05;
  private muggedChance: number;
  private encounterChance: number;
  private runawayChance: number;

  constructor(nav: NavController, navParams: NavParams, chemService: ChemService) {
    this.nav = nav;
    this.navParams = navParams;
    this.chemService = chemService;
    this.player = navParams.get('player');
    this.destination = navParams.get('destination');
    this.messages = ["funny message 0", "funny message 1", "funny message 2"];
    let index = Math.floor(Math.random() * this.messages.length);
    this.message = this.messages[index];
    this.muggedChance = 0.02 - this.player.guards * 0.0035;
    this.encounterChance = 0.33 - this.player.guards * 0.06;
    this.runawayChance = 0.0 + this.player.brahmin * 0.015;
  }

  ionViewLoaded() {
    this.accrueInterest();
    let selector = Math.random();
    if (selector < this.chemsFoundChance) {
      this.presentChemsFoundModal();
    } else if (selector < this.chemsFoundChance + this.muggedChance) {
      this.presentMuggedModal();
    } else if (selector < this.chemsFoundChance + this.muggedChance +
               this.encounterChance) {
      this.triggerEncounter();
    } else if (selector < this.chemsFoundChance + this.muggedChance +
               this.encounterChance + this.runawayChance) {
      this.presentRunawayModal();
    } else if (this.player.debt > 0) {
      this.player.ageOfDebt += 1;
      console.log("age of debt increased");
      if (this.player.ageOfDebt > 12) {
        this.presentLoanSharkModal('fatal');
      } else if (this.player.ageOfDebt > 10 && !this.player.beatenTwice) {
        this.player.beatenTwice = true;
        this.presentLoanSharkModal('severe');
      } else if (this.player.ageOfDebt > 5 && !this.player.beatenOnce) {
        this.player.beatenOnce = true;
        this.presentLoanSharkModal('minor');
      } else {
        this.continueToDestination();
      }
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

  presentRunawayModal() {
    let runawayModal = Modal.create(RunawayModalPage, { player: this.player });
    runawayModal.onDismiss((player: Player) => {
      this.player = player;
      this.continueToDestination();
    });
    this.nav.present(runawayModal);
  }

  presentLoanSharkModal(severity: string) {
    let loanSharkModal = Modal.create(LoanSharkModalPage, { 
      player: this.player,
      severity: severity });
    loanSharkModal.onDismiss((player: Player) => {
      if (player != null) {
        this.player = player;
        this.continueToDestination();
      } else {
        this.nav.setRoot(LocalLoginPage);
      }
    });
    this.nav.present(loanSharkModal);
  }

  triggerEncounter() {
    this.nav.setRoot(EncounterPage, {
      player: this.player,
      destination: this.destination
    });
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
  templateUrl: 'build/pages/travel-dispatcher/runaway-modal.html',
  providers: [SqlService]
})
class RunawayModalPage {
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
    this.player.brahmin -= 1;
    this.player.inventory.removeOneBrahminsWorth(this.player.brahmin);
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

@Component({
  templateUrl: 'build/pages/travel-dispatcher/loan-shark-modal.html',
  providers: [SqlService]
})
class LoanSharkModalPage {
  private nav: NavController;
  private navParams: NavParams;
  private viewCtrl: ViewController;
  private player: Player;
  private sqlService: SqlService;
  private severity: string;

  constructor(nav: NavController, navParams: NavParams,
    viewCtrl: ViewController, sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.player = this.navParams.get('player');
    this.severity = this.navParams.get('severity');
    this.viewCtrl = viewCtrl;
    this.sqlService = sqlService;
  }

  dismiss() {
    switch (this.severity) {
      case 'minor':
        this.player.health = Math.round(this.player.health * 0.75);
        break;
      case 'severe':
        this.player.health = Math.round(this.player.health * 0.25);
        break;
      default:
        console.error("invalid severity value");
    }
    this.sqlService.savePlayerState(this.player);
    this.viewCtrl.dismiss(this.player);
  }

  newGame() {
    this.sqlService.clearPlayerState();
    this.viewCtrl.dismiss(null);
  }
}