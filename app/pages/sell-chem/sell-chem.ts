import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {SqlService} from '../../providers/services/sql-storage-service';

@Component({
  templateUrl: 'build/pages/sell-chem/sell-chem.html',
  providers: [SqlService],
  directives: [FORM_DIRECTIVES]
})
export class SellChemPage {
  private nav: NavController;
  private navParams: NavParams;
  private sqlService: SqlService;
  private player: Player;
  private chem: Chem;
  private sellForm: ControlGroup;
  private maxSellable: number;
  private quantity: AbstractControl;

  constructor(nav: NavController, navParams: NavParams,
    sqlService: SqlService, fb: FormBuilder) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;

    this.player = navParams.get('player');
    this.chem = navParams.get('chem');
    this.maxSellable = this.player.quantityCarrying(this.chem);

    this.sellForm = fb.group({
      'quantity': ['', Validators.compose([Validators.required])]
    })
    this.quantity = this.sellForm.controls['quantity'];
  }

  onSubmit(value: number): void {
    if (this.sellForm.valid) {
      //do some bounds checking, this will be removed once Ionic 2 adds range sliders
      if (this.quantity.value < 0 || this.quantity.value > this.maxSellable) {
        alert("check your bounds and try again");
        return;
      }
      console.log('Submitted value: ', value);
      this.player.sell(this.chem, this.quantity.value);
      this.sqlService.savePlayerState(this.player);
      this.nav.pop();
    }
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
}
