import {Component} from '@angular/core';
import {NavController, NavParams, Alert} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {SqlService} from '../../providers/services/sql-storage-service';

@Component({
  templateUrl: 'build/pages/caravan-hq/caravan-hq.html',
  providers: [SqlService]
})
export class CaravanHqPage {
  private nav: NavController;
  private navParams: NavParams;
  private sqlService: SqlService;
  private player: Player;
  private notEnoughCaps: boolean;
  private atCapacity: boolean;
  private brahminPrice: number = 5000;
  private maxBrahmin: number = 10;
  private guardPrice: number = 20000;
  private maxGuards: number = 5;

  constructor(nav: NavController, navParams: NavParams, sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;
    this.player = navParams.get('player');
    this.notEnoughCaps = false;
    this.atCapacity = false;
  }

  buyBrahmin() {
    if (this.player.caps < this.brahminPrice) {
      this.presentErrorAlert('Not enough caps');
    } else if (this.player.brahmin >= this.maxBrahmin) {
      this.presentErrorAlert('You can only handle 10 brahmin');
    } else {
      this.player.brahmin += 1;
      this.player.caps -= this.brahminPrice;
      this.sqlService.savePlayerState(this.player);
    }
  }

  hireGuard() {
    if (this.player.caps < this.guardPrice) {
      this.presentErrorAlert('Not enough caps');
    } else if (this.player.guards >= this.maxGuards) {
      this.presentErrorAlert('You can only hire 5 guards');
    } else {
      this.player.guards += 1;
      this.player.caps -= this.guardPrice;
      this.sqlService.savePlayerState(this.player);
    }
  }

  presentErrorAlert(msg: string) {
    let alert = Alert.create({
      title: 'Error',
      message: msg,
      buttons: ['Dismiss']
    });
    this.nav.present(alert);
  }
}