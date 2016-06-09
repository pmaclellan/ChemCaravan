import {Injectable} from '@angular/core'; 
import {Chem} from '../classes/chem';

@Injectable()
export class ChemService {
  private chems: Chem[];

  constructor() {
    this.chems = [
      new Chem('Jet', 400, 0.7, 
        'Addicts are going nuts for jet!', 
        'Call Mama Murphy, jet prices have bottomed out!'),
      new Chem('Buffout', 750, 0.8,
        'Buffout prices are ridiculously high.',
        'The market is flooded with cheap buffout.'),
      new Chem('Mentats', 50, 0.9,
        'Somebody must want to reopen Shaw High School!',
        'Rival chem dealers raided a pharmacy and are selling cheap mentats!'),
      new Chem('Psycho', 2500, 0.8,
        'Addicts are buying pyscho at ridiculous prices!',
        'The market is flooded with cheap psycho.'),
      new Chem('Overdrive', 1000, 0.8,
        'Overdrive prices are through the roof.',
        'Is Fizzco in town or something?'),
      new Chem('Gwinnet Beer', 25, 0.9,
        'The boozehounds are going crazy for Gwinnet beer!',
        'Somebody raided the factory and is selling cheap Gwinnet beer!'),
      new Chem('Cigarettes', 10, 0.8,
        'There is a cigarette shortage, prices are high.',
        'The market is flooded with cheap, homemade cigarettes.'),
      new Chem('Psychobuff', 500, 0.7,
        'Addicts are buying psychobuff at ridiculous prices!',
        'The market is flooded with cheap psychobuff.'),
      new Chem('Rad-X', 100, 0.6,
        'There is a rad storm coming, people are clambering for rad-x!',
        'People aren\'t that worried about radiation right now.'),
      new Chem('Day Tripper', 25000, 0.2,
        'The addicts are going nuts for day tripper.',
        'Someone has been selling cheap, homemade day tripper.'),
      new Chem('UltraJet', 10000, 0.5,
        'The junkies are jonesing for some ultrajet.',
        'Ultrajet prices bottomed out!')
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

  numberOfChems(): number {
    return this.chems.length;
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