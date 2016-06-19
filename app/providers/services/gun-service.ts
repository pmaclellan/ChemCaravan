import {Injectable} from '@angular/core';
import {Gun} from '../classes/gun';

@Injectable()
export class GunService {
  private guns: Gun[];

  constructor() {
    this.guns = [
      new Gun('10mm Pistol', 200, 0.7, 40, 10),
      new Gun('Hunting Rifle', 500, 0.8, 60, 10),
      new Gun('Submachine Gun', 1000, 0.9, 80, 10),
      new Gun('Laser Rifle', 2000, 0.95, 100, 10),
      new Gun('Alien Blaster', 5000, 0.99, 150, 10)
    ]
  }

  getGuns(): Gun[] {
    return this.guns;
  }

  getGun(index: number) {
    if (index >= 0 && index < this.guns.length) {
      return this.guns[index];
    } else {
      return null;
    }
  }
}