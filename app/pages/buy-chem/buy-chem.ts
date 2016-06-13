import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {SqlService} from '../../providers/services/sql-storage-service';

@Component({
  templateUrl: 'build/pages/buy-chem/buy-chem.html',
  providers: [SqlService]
})
export class BuyChemPage {
  private nav: NavController;
  private navParams: NavParams;
  private sqlService: SqlService;
  private player: Player;
  private chem: Chem;
  private maxPurchaseable: number;
  private quantity: number;

  constructor(nav: NavController, navParams: NavParams, 
    sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;

    this.player = navParams.get('player');
    this.chem = navParams.get('chem');
    this.maxPurchaseable = Math.floor(this.player.caps / this.chem.currentPrice);
    if (this.maxPurchaseable > this.player.getAvailableSpace()) {
      this.maxPurchaseable = this.player.getAvailableSpace();
    }
    this.quantity = this.maxPurchaseable;
  }

  buy(): void {
    this.player.purchase(this.chem, this.quantity);
    this.sqlService.savePlayerState(this.player);
    this.nav.pop();
  }
}
