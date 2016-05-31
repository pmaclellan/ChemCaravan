import {Page, NavController, NavParams, MenuController} from 'ionic-angular';
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
  private settlementService: SettlementService;
	private player: Player;
	private settlement: Settlement;
  private settlements: Settlement[];
  private menu: MenuController;

	constructor(nav: NavController, navParams: NavParams, 
							sqlService: SqlService, settlementService: SettlementService,
							menu: MenuController) {
		this.nav = nav;
		this.navParams = navParams;
		this.sqlService = sqlService;
    this.settlementService = settlementService;
    this.menu = menu;

		this.player = navParams.get('player');
		this.settlement = navParams.get('settlement');
    this.settlements = settlementService.getSettlements();
    //don't allow navigation to current settlement
    this.settlements.filter((value: Settlement) => value != this.settlement);
    console.log(this.menu.getMenus());
    this.menu.open();
	}
}