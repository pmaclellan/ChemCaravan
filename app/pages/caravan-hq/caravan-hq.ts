import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
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

  constructor(nav: NavController, navParams: NavParams, sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;
    this.player = navParams.get('player');
    this.notEnoughCaps = false;
    this.atCapacity = false;
  }

  buyBrahmin() {
    if (this.player.caps < 5000) {
      this.notEnoughCaps = true;
    } else if (this.player.brahmin >= 10) {
      this.atCapacity = true;
    } else {
      this.player.brahmin += 1;
      this.player.caps -= 5000;
      this.sqlService.savePlayerState(this.player);
    }
  }
}