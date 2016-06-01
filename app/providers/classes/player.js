"use strict";
var inventory_1 = require('./inventory');
var Player = (function () {
    function Player(name, playerState) {
        this.name = name;
        this.caps = playerState ? playerState.caps : 500;
        this.bank = playerState ? playerState.bank : 0;
        this.debt = playerState ? playerState.debt : 500;
        this.health = playerState ? playerState.health : 100;
        this.guards = playerState ? playerState.guards : 0;
        this.brahmin = playerState ? playerState.brahmin : 0;
        this.location = playerState ? playerState.location : 0;
        this.inventory = new inventory_1.Inventory();
        if (playerState) {
            this.inventory.setChems(playerState.inventory.chems);
        }
    }
    Player.prototype.pricePaid = function (chem) {
        return this.inventory.getPricePaid(chem);
    };
    Player.prototype.quantityCarrying = function (chem) {
        return this.inventory.getQuantity(chem);
    };
    return Player;
}());
exports.Player = Player;
