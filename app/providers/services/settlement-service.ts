import {Injectable} from '@angular/core'; 
import {Settlement} from '../classes/settlement'

@Injectable()
export class SettlementService {
  private settlements: Settlement[];

  constructor() {
    this.settlements = [
      new Settlement(0, 'Diamond City', '/img/settlements/diamond-city-overview.jpg'),
      new Settlement(1, 'Concord', '/img/settlements/concord-aerial.jpg'),
      new Settlement(2, 'Sanctuary Hills', '/img/settlements/sanctuary-hills.jpg')
    ]
  }

  getSettlements(): Settlement[] {
    return this.settlements;
  }

  getSettlement(index: number) {
    if (index >= 0 && index < this.settlements.length) {
      return this.settlements[index];
    } else {
      return null;
    }
  }
}