export class Player {
  name: string;
  caps: number;
  bank: number;
  debt: number;
  health: number;
  guards: number;
  brahmin: number;
  location: number;

  constructor(name: string) {
    this.name = name;
    this.caps = 500;
    this.bank = 0;
    this.debt = 500;
    this.health = 100;
    this.guards = 0;
    this.brahmin = 0;
    this.location = 0;
  }
}