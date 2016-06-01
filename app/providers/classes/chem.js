"use strict";
var Chem = (function () {
    function Chem(name, basePrice, probability) {
        this.name = name;
        this.basePrice = basePrice;
        this.currentPrice = basePrice;
        this.probability = probability;
    }
    return Chem;
}());
exports.Chem = Chem;
