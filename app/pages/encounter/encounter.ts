import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {Gun} from '../../providers/classes/gun';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementPage} from '../settlement-page/settlement-page';
import {LocalLoginPage} from '../local-login/local-login';
import {SqlService} from '../../providers/services/sql-storage-service';

@Component({
  templateUrl: 'build/pages/encounter/encounter.html',
  providers: [SqlService]
})
export class EncounterPage {
  private nav: NavController;
  private navParams: NavParams;
  private sqlService: SqlService;

  private player: Player;
  private destination: Settlement;

  private numRaiders: number;
  private raiderMoney: number;
  private raiderDamage: number;

  private escapeChance: number;
  private raiderHitChance: number;

  private playerEscaped: boolean;
  private playerDied: boolean;

  private playerResultMessage: string;
  private statusMessage: string;
  private raiderResultMessage: string;

  private actionsDisabled: boolean;

  constructor(nav: NavController, navParams: NavParams, sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;
    this.player = navParams.get('player');
    this.destination = navParams.get('destination');
    this.numRaiders = Math.floor(Math.random() * 10 + 1);
    this.raiderMoney = Math.floor(Math.random() * 5000 + 1000) * this.numRaiders;
    this.escapeChance = 0.75 - (this.numRaiders * 0.05);
    this.raiderHitChance = 0.25;
    this.raiderDamage = 10;
    this.playerEscaped = false;
    this.playerDied = false;
    this.playerResultMessage = '';
    this.statusMessage = this.numRaiders + 
      ' raiders have ambushed you! \nWhat do you do?';
    this.raiderResultMessage = '';
    this.actionsDisabled = false;
  }

  run() {
    this.actionsDisabled = true;
    let chance = Math.random();
    if (chance < this.escapeChance) {
      this.playerEscaped = true;
      this.statusMessage = 'You escaped!'
    } else {
      this.playerResultMessage = 'You try to run but can\'t escape';
      this.raidersTakeTurn();
    }
  }

  shoot() {
    this.actionsDisabled = true;
    this.player.inventory.shootGun(); //decrease ammo
    let chance = Math.random();
    if (chance < this.player.inventory.getBestGun().accuracy) {
      this.playerResultMessage = 'You killed a raider!';
      this.numRaiders = Number(this.numRaiders) - 1;
      if (this.numRaiders == 0) {
        this.statusMessage = 'All raiders are dead! \n You find ' +
          this.raiderMoney + ' caps on them.';
        this.player.caps += Number(this.raiderMoney);
        this.sqlService.savePlayerState(this.player);
        return;
      }
    } else {
      this.playerResultMessage = 'You failed to hit.';
    }
    this.raidersTakeTurn();
  }

  continue() {
    if (this.playerDied) {
      this.sqlService.clearPlayerState();
      this.nav.setRoot(LocalLoginPage);
    } else {
      this.nav.setRoot(SettlementPage, {
        player: this.player,
        settlement: this.destination
      });
    }
  }

  raidersTakeTurn() {
    this.statusMessage = this.numRaiders + ' raiders are shooting...';
    for (let i = 0; i < this.numRaiders; i += 1) {
      let chance = Math.random();
      if (chance < this.raiderHitChance) {
        let chance2 = Math.random();
        if (this.player.brahmin < 1 && this.player.guards < 1) {
          this.playerHit();
        } else if (this.player.brahmin > 0 && this.player.guards < 1) {
          if (chance2 < 0.5) {
            this.playerHit();
          } else {
            this.brahminHit();
          }
        } else if (this.player.brahmin < 1 && this.player.guards > 0) {
          if (chance2 < 0.5) {
            this.playerHit();
          } else {
            this.guardHit();
          }
        } else if (this.player.brahmin > 0 && this.player.guards > 0) {
          if (chance2 < 0.33) {
            this.playerHit();
          } else if (chance2 < 0.66) {
            this.guardHit();
          } else {
            this.brahminHit();
          }
        }
        break;
      } else {
        this.raiderResultMessage = 'Miss!';
      }
    }
    this.sqlService.savePlayerState(this.player);
    this.actionsDisabled = false;
  }

  escapePercentage(): string {
    return Math.floor(this.escapeChance * 100) + '%';
  }

  hitPercentage(): string {
    if (this.player.inventory.getBestGun() != null) {
      return Math.floor(this.player.inventory.getBestGun().accuracy * 100) + '%';
    } else {
      return 0 + '%';
    }
  }

  playerHit() {
    this.raiderResultMessage = 'You\'ve been hit!';
    this.player.health -= this.raiderDamage;
    if (this.player.health <= 0) {
      this.statusMessage = 'You died.';
      this.playerDied = true;
    }
  }

  guardHit() {
    this.raiderResultMessage = 'One of your guards has been killed!';
    this.player.guards -= 1;
  }

  brahminHit() {
    this.raiderResultMessage = 'One of your brahmin has been killed!';
    this.player.brahmin -= 1;
    this.player.inventory.removeOneBrahminsWorth(this.player.brahmin);
  }
}