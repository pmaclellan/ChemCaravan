import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

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

export class Chem {
  name: string;
  basePrice: number;
  stdDev: number;
}


@Injectable()
export class SqlService {
  storage: Storage = null;
 
  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    /*this.storage.query(`CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      caps INTEGER,
      bank INTEGER,
      debt INTEGER,
      health INTEGER,
      guards INTEGER,
      brahmin INTEGER,
      location INTEGER FOREIGN KEY)`);*/
  }

  savePlayerState(player: Player) {
    console.log('entered savePlayerState()');
    this.storage.set('player', JSON.stringify(player));
  }

  clearPlayerState() {
    console.log('entered clearPlayerState()');
    this.storage.remove('player');
  }

  loadPlayerState() {
    console.log('entered loadPlayerState()');
    return this.storage.get('player').then((value) => {
      return (value) ? JSON.parse(value) : value; // <-- Simply check if the value is undefined before parsing.
    }, function(error) {
      console.error('Failed', error);
    });
  }

}