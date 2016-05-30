import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Player} from '../classes/player';

@Injectable()
export class SqlService {
  storage: Storage = null;
 
  constructor() {
    this.storage = new Storage(SqlStorage);
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
    return this.storage.get('player');
  }

}