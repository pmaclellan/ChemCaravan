import {Page, NavController, NavParams} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {SqlService} from '../../providers/services/sql-storage-service';

@Page({
  templateUrl: 'build/pages/buy-chem/buy-chem.html',
  providers: [SqlService]
})
export class BuyChemPage {
  private nav: NavController;
  private navParams: NavParams;
  private sqlService: SqlService;
  private player: Player;
  private chem: Chem;
  private buyForm: ControlGroup;
  private maxPurchaseable: number;
  private quantity: AbstractControl;

  constructor(nav: NavController, navParams: NavParams, 
    sqlService: SqlService, fb: FormBuilder) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;

    this.player = navParams.get('player');
    this.chem = navParams.get('chem');
    this.maxPurchaseable = Math.floor(this.player.caps / this.chem.currentPrice);

    this.buyForm = fb.group({
      'quantity': ['', Validators.compose([Validators.required])]
    })
    this.quantity = this.buyForm.controls['quantity'];
  }

  onSubmit(value: number): void {
    if (this.buyForm.valid) {
      console.log('Submitted value: ', value);
    }
  }
}