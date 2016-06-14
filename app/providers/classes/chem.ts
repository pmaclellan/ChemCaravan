export class Chem {
  name: string;
  basePrice: number;
  currentPrice: number;
  probability: number;
  highPriceMessage: string;
  lowPriceMessage: string;

  constructor(name: string, basePrice: number, probability: number,
              high: string, low: string, currentPrice?: number) {
    this.name = name;
    this.basePrice = basePrice;
    this.currentPrice = currentPrice | basePrice;
    this.probability = probability;
    this.highPriceMessage = high;
    this.lowPriceMessage = low;
  }
}