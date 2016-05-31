import {Page, NavController, NavParams} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementService} from '../../providers/services/settlement-service';
import {SqlService} from '../../providers/services/sql-storage-service';

@Page({
	templateUrl: 'build/pages/settlement-page/settlement-page.html',
	providers: [SqlService, SettlementService]
})
export class SettlementPage {
	private nav: NavController;
	private navParams: NavParams;
	private sqlService: SqlService;
	private player: Player;
	private settlement: Settlement;

	constructor(nav: NavController, navParams: NavParams, sqlService: SqlService) {
		this.nav = nav;
		this.navParams = navParams;
		this.sqlService = sqlService;

		this.player = navParams.get('player');
		this.settlement = navParams.get('settlement');
		console.log(this.player.name + " has arrived in " + this.settlement.name);
	}
}