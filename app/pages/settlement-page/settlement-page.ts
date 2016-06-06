import {Page, NavController, NavParams, MenuController, Modal, ViewController} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Chem} from '../../providers/classes/chem';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementService} from '../../providers/services/settlement-service';
import {SqlService} from '../../providers/services/sql-storage-service';
import {ChemService} from '../../providers/services/chem-service';
import {BuyChemPage} from '../buy-chem/buy-chem';
import {SellChemPage} from '../sell-chem/sell-chem';
import {TravelDispatcherPage} from '../travel-dispatcher/travel-dispatcher';

@Page({
	templateUrl: 'build/pages/settlement-page/settlement-page.html',
	providers: [SqlService, ChemService]
})
export class SettlementPage {
	private nav: NavController;
	private navParams: NavParams;
	private sqlService: SqlService;
  private chemService: ChemService;
	private player: Player;
	private settlement: Settlement;
  private availableChems: Chem[];
  private menu: MenuController;

	constructor(nav: NavController, navParams: NavParams, sqlService: SqlService,
							chemService: ChemService, menu: MenuController) {
		this.nav = nav;
		this.navParams = navParams;
		this.sqlService = sqlService;
    this.chemService = chemService;
    this.menu = menu;

		this.player = navParams.get('player');
		this.settlement = navParams.get('settlement');
    //update the player's current location now that we have arrived safely
    this.player.location = this.settlement.index;
    this.sqlService.savePlayerState(this.player);
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

  presentTravelModal() {
    let travelModal = Modal.create(TravelModalPage, { settlement: this.settlement });
    travelModal.onDismiss((destination: Settlement) => {
      if (destination != null) {
        this.nav.setRoot(TravelDispatcherPage, {
          player: this.player,
          destination: destination
        });
      }
    });
    this.nav.present(travelModal);
  }
}

/*
The TravelModalPage allows the player to select a settlement to travel to.
Settlements are presented in a list which excludes the settlement the player is 
currently at.
*/
@Page({
  templateUrl: 'build/pages/settlement-page/travel-modal.html',
  providers: [SettlementService]
})
class TravelModalPage {
  private nav: NavController;
  private navParams: NavParams;
  private viewCtrl: ViewController;
  private settlementService: SettlementService;
  private settlement: Settlement;
  private settlements: Settlement[];

  constructor(nav: NavController, navParams: NavParams,
              viewCtrl: ViewController, settlementService: SettlementService) {
    this.nav = nav;
    this.navParams = navParams;
    this.settlementService = settlementService;
    this.viewCtrl = viewCtrl;
    this.settlement = navParams.get('settlement');
    this.settlements = settlementService.getFilteredSettlements(this.settlement.index);
  }

  dismiss(destination: Settlement) {
    this.viewCtrl.dismiss(destination);
  }
}