import {Component} from '@angular/core';
import {NavController, NavParams, Alert} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Gun} from '../../providers/classes/gun';
import {GunService} from '../../providers/services/gun-service';
import {SqlService} from '../../providers/services/sql-storage-service';

@Component({
  templateUrl: 'build/pages/kleo/kleo.html',
  providers: [SqlService, GunService]
})
export class GunDealerPage {
  private nav: NavController;
  private navParams: NavParams;
  private sqlService: SqlService;
  private gunService: GunService;
  private player: Player;
  private availableGuns: Gun[];
  private selectedGun: Gun;

  constructor(nav: NavController, navParams: NavParams, 
              gunService: GunService, sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;
    this.gunService = gunService;
    this.player = navParams.get('player');
    this.availableGuns = gunService.getGuns();
    this.selectedGun = null;
  }

  presentErrorAlert(msg: string) {
    let alert = Alert.create({
      title: 'Error',
      message: msg,
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  buy(gun: Gun) {
    if (gun.price > this.player.caps) {
      this.presentErrorAlert('You can\'t afford that.');
    } else if (this.player.inventory.getGunList().length > 3) {
      this.presentErrorAlert('You can only carry 3 guns at a time.');
    } else {
      this.player.inventory.addGun(gun);
      this.player.caps -= Number(gun.price);
      this.sqlService.savePlayerState(this.player);
    }
  }
}