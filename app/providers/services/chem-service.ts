import {Injectable} from '@angular/core'; 
import {Chem} from '../classes/chem';

@Injectable()
export class ChemService {
  private chems: Chem[];

  constructor() {
    this.chems = [
      new Chem('Jet', 100, 0.7),
      new Chem('Buffout', 100, 0.8),
      new Chem('Mentats', 100, 0.9)
    ]
  }

  getChems(): Chem[] {
    return this.chems;
  }

  getChem(index: number) {
    if (index >= 0 && index < this.chems.length) {
      return this.chems[index];
    } else {
      return null;
    }
  }

  generateChemSet() : Chem[] {
    let result = [];
    for (let chem of this.chems) {
      //roll to see if this chem should be included in the set
      if (Math.random() < chem.probability) {
        //roll to see what the price should be
        let price = Math.round((this.normalRand() + 1.0) * chem.basePrice);
        chem.currentPrice = price;
        result.push(chem);
      }
    }
    return result;
  }

  private normalRand() : number {
  return ((Math.random() + Math.random() + Math.random() + 
           Math.random() + Math.random() + Math.random()) - 3) / 3;
  }
}