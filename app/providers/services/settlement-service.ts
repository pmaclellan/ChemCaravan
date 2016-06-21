import {Injectable} from '@angular/core'; 
import {Settlement} from '../classes/settlement'
import {LoansharkPage} from '../../pages/loanshark/loanshark';
import {CaravanHqPage} from '../../pages/caravan-hq/caravan-hq';
import {BankPage} from '../../pages/bank/bank';
import {DoctorPage} from '../../pages/doctor/doctor';
import {GunDealerPage} from '../../pages/kleo/kleo';

@Injectable()
export class SettlementService {
  private settlements: Settlement[];

  constructor() {
    this.settlements = [
      new Settlement(0, 'Diamond City', '/img/settlements/diamond-city-overview.jpg', 
                     { name: 'Doctor', component: DoctorPage }),
      new Settlement(1, 'Park Street Station', '/img/settlements/concord-aerial.jpg', 
                     { name: 'Skinny Malone', component: LoansharkPage }),
      new Settlement(2, 'Sanctuary Hills', '/img/settlements/sanctuary-hills.jpg', null),
      new Settlement(3, 'Bunker Hill', '/img/settlements/concord-aerial.jpg', 
                     { name: 'Caravan HQ', component: CaravanHqPage }),
      new Settlement(4, 'Lexington', '/img/settlements/concord-aerial.jpg', 
                     { name: 'Bank', component: BankPage }),
      new Settlement(5, 'Goodneighbor', '/img/settlements/concord-aerial.jpg',
                     { name: 'KL-E-0', component: GunDealerPage }),
      new Settlement(6, 'Jamaica Plain', '/img/settlements/concord-aerial.jpg', null),
      new Settlement(7, 'Quincy', '/img/settlements/concord-aerial.jpg', null),
      new Settlement(8, 'Cambridge', '/img/settlements/concord-aerial.jpg', null)
    ]
  }

  getSettlements(): Settlement[] {
    return this.settlements;
  }

  getFilteredSettlements(indexToIgnore: number) {
    return this.settlements.filter((value: Settlement) => {
      return value.index != indexToIgnore;
    });
  }

  getSettlement(index: number) {
    if (index >= 0 && index < this.settlements.length) {
      return this.settlements[index];
    } else {
      return null;
    }
  }
}