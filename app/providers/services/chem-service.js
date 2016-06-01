"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var chem_1 = require('../classes/chem');
var ChemService = (function () {
    function ChemService() {
        this.chems = [
            new chem_1.Chem('Jet', 100, 0.7),
            new chem_1.Chem('Buffout', 100, 0.8),
            new chem_1.Chem('Mentats', 100, 0.9)
        ];
    }
    ChemService.prototype.getChems = function () {
        return this.chems;
    };
    ChemService.prototype.getChem = function (index) {
        if (index >= 0 && index < this.chems.length) {
            return this.chems[index];
        }
        else {
            return null;
        }
    };
    ChemService.prototype.generateChemSet = function () {
        var result = [];
        for (var _i = 0, _a = this.chems; _i < _a.length; _i++) {
            var chem = _a[_i];
            //roll to see if this chem should be included in the set
            if (Math.random() < chem.probability) {
                //roll to see what the price should be
                var price = Math.round((this.normalRand() + 1.0) * chem.basePrice);
                chem.currentPrice = price;
                result.push(chem);
            }
        }
        return result;
    };
    ChemService.prototype.normalRand = function () {
        return ((Math.random() + Math.random() + Math.random() +
            Math.random() + Math.random() + Math.random()) - 3) / 3;
    };
    ChemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChemService);
    return ChemService;
}());
exports.ChemService = ChemService;
