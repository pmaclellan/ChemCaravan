import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {SqlService} from '../../providers/services/sql-storage-service';

@Component({
  templateUrl: 'build/pages/sell-chem/sell-chem.html',
  providers: [SqlService]
})
export class SellChemPage {
  private nav: NavController;
  private navParams: NavParams;
  private sqlService: SqlService;
  private player: Player;
  private chem: Chem;
  private maxSellable: number;
  private quantity: number;

  constructor(nav: NavController, navParams: NavParams, sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;

    this.player = navParams.get('player');
    this.chem = navParams.get('chem');
    this.maxSellable = this.player.quantityCarrying(this.chem);
    this.quantity = this.maxSellable;
  }

  sell(): void {
    this.player.sell(this.chem, this.quantity, this.getGuardsShare());
    this.sqlService.savePlayerState(this.player);
    this.nav.pop();
  }

  getProfitMargin(): number {
    if (this.player.pricePaid(this.chem) > 0) {
      //return the profit margin percentage rounded to two deciml places
      return Math.round( ((this.chem.currentPrice - this.player.pricePaid(this.chem)) / 
                           this.player.pricePaid(this.chem)) * 10000 ) / 100;
    } else {
      return null;
    }
  }

  getProfit(): number {
    return this.getProfitMargin() / 100 * this.player.pricePaid(this.chem) * this.quantity;
  }

  getGuardsShare(): number {
    let profit: number = this.getProfit();
    if (profit <= 0) {
      return 0;
    } else {
      return Math.floor(profit * this.player.guards * 0.05);
    }
  }
}
