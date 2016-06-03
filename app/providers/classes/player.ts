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

  constructor(name: string, playerState?: any) {
    this.name = name;
    this.caps = playerState ? playerState.caps : 500;
    this.bank = playerState ? playerState.bank : 0;
    this.debt = playerState ? playerState.debt : 500;
    this.health = playerState ? playerState.health : 100;
    this.guards = playerState ? playerState.guards : 0;
    this.brahmin = playerState ? playerState.brahmin : 0;
    this.location = playerState ? playerState.location : 0;
    this.inventory = new Inventory();
    if (playerState) {
      this.inventory.setChems(playerState.inventory.chems);
    }
  }

  pricePaid(chem: Chem): number {
    return this.inventory.getPricePaid(chem);
  }

  quantityCarrying(chem: Chem): number {
    return this.inventory.getQuantity(chem);
  }

  getAvailableSpace() {
    //TODO: replace 20 with default player space
    return (20 + this.brahmin * 10) - this.inventory.getTotalSpaceUsed();
  }

  purchase(chem: Chem, quantity: number) {
    this.caps -= chem.currentPrice * quantity;
    this.inventory.addChem(chem, quantity);
  }

  sell(chem: Chem, quantity: number) {
    this.caps += chem.currentPrice * quantity;
    this.inventory.removeChem(chem, quantity);
  }
}