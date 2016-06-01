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
var settlement_1 = require('../classes/settlement');
var SettlementService = (function () {
    function SettlementService() {
        this.settlements = [
            new settlement_1.Settlement(0, 'Diamond City', '/img/settlements/diamond-city-overview.jpg'),
            new settlement_1.Settlement(1, 'Concord', '/img/settlements/concord-aerial.jpg'),
            new settlement_1.Settlement(2, 'Sanctuary Hills', '/img/settlements/sanctuary-hills.jpg')
        ];
    }
    SettlementService.prototype.getSettlements = function () {
        return this.settlements;
    };
    SettlementService.prototype.getSettlement = function (index) {
        if (index >= 0 && index < this.settlements.length) {
            return this.settlements[index];
        }
        else {
            return null;
        }
    };
    SettlementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SettlementService);
    return SettlementService;
}());
exports.SettlementService = SettlementService;
