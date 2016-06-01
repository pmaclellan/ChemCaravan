export class Chem {
  name: string;
  basePrice: number;
  currentPrice: number;
  probability: number;

  constructor(name: string, basePrice: number, probability: number) {
    this.name = name;
    this.basePrice = basePrice;
    this.currentPrice = basePrice;
    this.probability = probability;
  }
}