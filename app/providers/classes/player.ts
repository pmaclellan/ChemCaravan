import {Inventory} from './inventory';
import {Chem} from './chem';

export class Player {
  name: string;
  caps: number;
  bank: number;
  debt: number;
  health: number;
  guards: number;
  brahmin: number;
  location: number;
  inventory: Inventory;

  constructor(name: string) {
    this.name = name;
    this.caps = 500;
    this.bank = 0;
    this.debt = 500;
    this.health = 100;
    this.guards = 0;
    this.brahmin = 0;
    this.location = 0;
    this.inventory = new Inventory();
  }

  pricePaid(chem: Chem): number {
    return this.inventory.getPricePaid(chem);
  }

  quantityCarrying(chem: Chem): number {
    return this.inventory.getQuantity(chem);
  }
}