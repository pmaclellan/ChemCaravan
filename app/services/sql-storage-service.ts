import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from 'angular2/core';

export class Player {
  id: number;
  name: string;
  caps: number;
  bank: number;
  debt: number;
  health: number;
  guards: number;
  brahmin: number;
  location: number;
}

@Injectable()
export class SqlService {
  storage: Storage = null;
 
  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query(`CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      caps INTEGER,
      bank INTEGER,
      debt INTEGER,
      health INTEGER,
      guards INTEGER,
      brahmin INTEGER,
      location INTEGER FOREIGN KEY)`);
  }

}