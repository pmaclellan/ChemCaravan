import {Page, NavController, NavParams, MenuController} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementService} from '../../providers/services/settlement-service';
import {SqlService} from '../../providers/services/sql-storage-service';
import {ChemService} from '../../providers/services/chem-service';
import {BuyChemPage} from '../buy-chem/buy-chem';
import {SellChemPage} from '../sell-chem/sell-chem';

@Page({
	templateUrl: 'build/pages/settlement-page/settlement-page.html',
	providers: [SqlService, SettlementService, ChemService]
})
export class SettlementPage {
	private nav: NavController;
	private navParams: NavParams;
	private sqlService: SqlService;
  private settlementService: SettlementService;
  private chemService: ChemService;
	private player: Player;
	private settlement: Settlement;
  private settlements: Settlement[];
  private availableChems: Chem[];
  private menu: MenuController;

	constructor(nav: NavController, navParams: NavParams, 
							sqlService: SqlService, settlementService: SettlementService,
							chemService: ChemService, menu: MenuController) {
		this.nav = nav;
		this.navParams = navParams;
		this.sqlService = sqlService;
    this.settlementService = settlementService;
    this.chemService = chemService;
    this.menu = menu;

		this.player = navParams.get('player');
		this.sqlService.savePlayerState(this.player);
		this.settlement = navParams.get('settlement');
    this.settlements = settlementService.getSettlements();
    //don't allow navigation to current settlement
    this.settlements.filter((value: Settlement) => value != this.settlement);
    // console.log(this.menu.getMenus());
    // this.menu.open();
    this.availableChems = chemService.generateChemSet();
	}

	onPageWillEnter() {
		/*reload the player state every time the page becomes active
			to avoid stale data after a buy or sell */
		this.sqlService.loadPlayerState().then((playerState) => {
			console.log('player loaded: ' + playerState);
			//create the Player object if a stored state was successfully retrieved
			if (playerState) {
				let playerShadow = JSON.parse(playerState);
				this.player = new Player(playerShadow.name, playerShadow);
			}
		}, function(error) {
			console.error('Failed to load player state', error);
		});
	}

  buy(chem: Chem) {
    this.nav.push(BuyChemPage, {
      player: this.player,
      chem: chem
    })
  }

  sell(chem: Chem) {
  	this.nav.push(SellChemPage, {
  		player: this.player,
  		chem: chem
  	})
  }
}