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
var sql_storage_service_1 = require('../../providers/services/sql-storage-service');
var BuyChemPage = (function () {
    function BuyChemPage(nav, navParams, sqlService) {
        this.nav = nav;
        this.navParams = navParams;
        this.sqlService = sqlService;
        this.player = navParams.get('player');
        this.chem = navParams.get('chem');
        this.maxPurchaseable = Math.floor(this.player.caps / this.chem.currentPrice);
        this.quantity = this.buyForm.controls['quantity'];
    }
    BuyChemPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/buy-chem/buy-chem.html',
            providers: [sql_storage_service_1.SqlService]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, sql_storage_service_1.SqlService])
    ], BuyChemPage);
    return BuyChemPage;
}());
exports.BuyChemPage = BuyChemPage;
