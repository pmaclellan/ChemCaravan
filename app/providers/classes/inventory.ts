import {Chem} from './chem';

export class Inventory {
  private chems: { [chem: string] : {quantity: number, price_paid: number } };

  constructor() {
    this.chems = {};
  }

  getQuantity(chem: Chem): number {
    if (chem.name in this.chems) {
      return this.chems[chem.name].quantity;
    } else {
      return 0;
    }
  }

  getPricePaid(chem: Chem): number {
    if (chem.name in this.chems) {
      return this.chems[chem.name].price_paid;
    } else {
      return null;
    }
  }

  //this is sort of a hack, only meant to be used when reloading player state
  setChems(chems: { [chem: string]: { quantity: number, price_paid: number } }) {
    this.chems = chems;
  }

  addChem(chem: Chem, quantity_added: number) {
    if (chem.name in this.chems) {
      let old_record = this.chems[chem.name];

      let old_total_value = old_record.quantity * old_record.price_paid;
      let new_quantity = old_record.quantity + quantity_added;
      let new_total_value = old_total_value + quantity_added * chem.currentPrice;
      let new_price = new_total_value / new_quantity;

      this.chems[chem.name] = { quantity: new_quantity, price_paid: new_price };
    } else {
      this.chems[chem.name] = { quantity: quantity_added, price_paid: chem.currentPrice };
    }
  }

  removeChem(chem: Chem, quantity_removed: number) {
    if ( !(chem.name in this.chems) || 
         quantity_removed > this.chems[chem.name].quantity) {
      throw "Error, unable to remove chem " + chem.name;
    } else {
      this.chems[chem.name].quantity -= quantity_removed;
      if (this.chems[chem.name].quantity == 0) {
        delete this.chems[chem.name];
      }
    }
  }
}