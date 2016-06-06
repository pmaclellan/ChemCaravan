import {Page} from 'ionic-angular';

export class Settlement {
  index: number;
  name: string;
  imageUrl: string;
  service: {
    name: string,
    component: any
  };

  constructor(index: number, name: string, imageUrl: string, service: {
    name: string,
    component: any
  }) {
    this.index = index;
    this.name = name;
    this.imageUrl = imageUrl;
    this.service = service;
  }
}