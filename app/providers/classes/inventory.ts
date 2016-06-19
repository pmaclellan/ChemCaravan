import {Chem} from './chem';
import {Gun} from './gun';

export class Inventory {
  private chems: { [chem: string] : {quantity: number, price_paid: number } };
  private guns: Gun[];

  constructor() {
    this.chems = {};
    this.guns = [];
  }

  /*------
    Chems
  -------*/
  getChemList(): { [chem: string]: { quantity: number, price_paid: number } }  {
    return this.chems;
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

  getTotalWorth(): number {
    let total = 0;
    for (let key in this.chems) {
      total += Number(this.chems[key].price_paid * this.chems[key].quantity)
    }
    return total;
  }

  getTotalSpaceUsed(): number {
    let total: number = 0;
    for (let key in this.chems) {
      total += Number(this.chems[key].quantity);
    }
    return total;
  }

  //this is sort of a hack, only meant to be used when reloading player state
  setChems(chems: { [chem: string]: { quantity: number, price_paid: number } }) {
    this.chems = chems;
  }

  addChem(chem: Chem, quantity_added: number) {
    if (chem.name in this.chems) {
      let old_record = this.chems[chem.name];

      let old_total_value = Number(old_record.quantity) * Number(old_record.price_paid);
      
      let new_quantity = Number(old_record.quantity) + Number(quantity_added);

      let new_total_value = Number(old_total_value) + 
                            Number(quantity_added) * Number(chem.currentPrice);
      
      let new_price = Number(new_total_value) / Number(new_quantity);
      new_price = Math.floor(Number(new_price) * 100.0) / 100.0;

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

  //remove a percentage of each chem carried when a brahmin dies or runs away
  removeOneBrahminsWorth(remainingBrahmin: number) {
    let decimationIndex = 0.64 + 0.03 * Number(remainingBrahmin);
    for (let key in this.chems) {
      this.chems[key].quantity = 
        Math.round(this.chems[key].quantity * Number(decimationIndex));
      if (this.chems[key].quantity <= 0) {
        delete this.chems[key];
      }
    }
  }

  /*------
    Chems
  -------*/
  getGunList(): Gun[] {
    return this.guns;
  }

  addGun(gun: Gun) {
    for (let i = 0; i < this.guns.length; i += 1) {
      if (this.guns[i].price < gun.price) {
        this.guns.splice(i, 0, gun);
        return;
      }
    }
    this.guns.push(gun);
  }

  removeGun(gun: Gun) {
    for (let i = 0; i < this.guns.length; i += 1) {
      if (this.guns[i].name = gun.name) {
        this.guns.splice(i, 1);
      }
    }
  }

  shootGun() {
    this.guns[0].ammo -= 1;
    if (this.guns[0].ammo <= 0) {
      this.guns.splice(0, 1);
    }
  }
}