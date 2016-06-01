"use strict";
var Inventory = (function () {
    function Inventory() {
        this.chems = {};
    }
    Inventory.prototype.getQuantity = function (chem) {
        if (chem.name in this.chems) {
            return this.chems[chem.name].quantity;
        }
        else {
            return 0;
        }
    };
    Inventory.prototype.getPricePaid = function (chem) {
        if (chem.name in this.chems) {
            return this.chems[chem.name].price_paid;
        }
        else {
            return null;
        }
    };
    //this is sort of a hack, only meant to be used when reloading player state
    Inventory.prototype.setChems = function (chems) {
        this.chems = chems;
    };
    Inventory.prototype.addChem = function (chem, quantity_added, price) {
        if (chem.name in this.chems) {
            var old_record = this.chems[chem.name];
            var old_total_value = old_record.quantity * old_record.price_paid;
            var new_quantity = old_record.quantity + quantity_added;
            var new_total_value = old_total_value + quantity_added * price;
            var new_price = new_total_value / new_quantity;
            this.chems[chem.name] = { quantity: new_quantity, price_paid: new_price };
        }
        else {
            this.chems[chem.name] = { quantity: quantity_added, price_paid: price };
        }
    };
    Inventory.prototype.removeChem = function (chem, quantity_removed) {
        if (!(chem.name in this.chems) ||
            quantity_removed > this.chems[chem.name].quantity) {
            throw "Error, unable to remove chem " + chem.name;
        }
        else {
            this.chems[chem.name].quantity -= quantity_removed;
            if (this.chems[chem.name].quantity == 0) {
                delete this.chems[chem.name];
            }
        }
    };
    return Inventory;
}());
exports.Inventory = Inventory;
