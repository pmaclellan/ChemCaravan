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
var ionic_angular_1 = require('ionic-angular');
var core_1 = require('@angular/core');
var SqlService = (function () {
    function SqlService() {
        this.storage = null;
        this.storage = new ionic_angular_1.Storage(ionic_angular_1.SqlStorage);
    }
    SqlService.prototype.savePlayerState = function (player) {
        console.log('entered savePlayerState()');
        this.storage.set('player', JSON.stringify(player));
    };
    SqlService.prototype.clearPlayerState = function () {
        console.log('entered clearPlayerState()');
        this.storage.remove('player');
    };
    SqlService.prototype.loadPlayerState = function () {
        console.log('entered loadPlayerState()');
        return this.storage.get('player');
    };
    SqlService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SqlService);
    return SqlService;
}());
exports.SqlService = SqlService;
