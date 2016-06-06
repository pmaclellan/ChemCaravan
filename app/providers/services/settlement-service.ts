import {Injectable} from '@angular/core'; 
import {Settlement} from '../classes/settlement'

@Injectable()
export class SettlementService {
  private settlements: Settlement[];

  constructor() {
    this.settlements = [
      new Settlement(0, 'Diamond City', '/img/settlements/diamond-city-overview.jpg'),
      new Settlement(1, 'Park Street', '/img/settlements/concord-aerial.jpg'),
      new Settlement(2, 'Sanctuary Hills', '/img/settlements/sanctuary-hills.jpg'),
      new Settlement(3, 'Concord', '/img/settlements/concord-aerial.jpg'),
      new Settlement(4, 'Lexington', '/img/settlements/concord-aerial.jpg'),
      new Settlement(5, 'Goodneighbor', '/img/settlements/concord-aerial.jpg'),
      new Settlement(6, 'Jamaica Plain', '/img/settlements/concord-aerial.jpg'),
      new Settlement(7, 'Quincy', '/img/settlements/concord-aerial.jpg'),
      new Settlement(8, 'Cambridge', '/img/settlements/concord-aerial.jpg')
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