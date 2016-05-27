import {Page, NavController, NavParams} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {Settlement} from '../../providers/classes/settlement';
import {SettlementService} from '../../providers/services/settlement-service';
import {SqlService} from '../../providers/services/sql-storage-service';

@Page({
	templateUrl: 'build/pages/settlement-page/settlement-page.html',
	providers: [SqlService, SettlementService]
})
export class LocalLoginPage {
	private nav: NavController;
	private sqlService: SqlService;
	private player: any;
}