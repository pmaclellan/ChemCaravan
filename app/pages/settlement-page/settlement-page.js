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
var settlement_service_1 = require('../../providers/services/settlement-service');
var sql_storage_service_1 = require('../../providers/services/sql-storage-service');
var chem_service_1 = require('../../providers/services/chem-service');
var SettlementPage = (function () {
    function SettlementPage(nav, navParams, sqlService, settlementService, chemService, menu) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.sqlService = sqlService;
        this.settlementService = settlementService;
        this.chemService = chemService;
        this.menu = menu;
        this.player = navParams.get('player');
        this.settlement = navParams.get('settlement');
        this.settlements = settlementService.getSettlements();
        //don't allow navigation to current settlement
        this.settlements.filter(function (value) { return value != _this.settlement; });
        // console.log(this.menu.getMenus());
        // this.menu.open();
        this.availableChems = chemService.generateChemSet();
    }
    SettlementPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/settlement-page/settlement-page.html',
            providers: [sql_storage_service_1.SqlService, settlement_service_1.SettlementService, chem_service_1.ChemService]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, sql_storage_service_1.SqlService, settlement_service_1.SettlementService, chem_service_1.ChemService, ionic_angular_1.MenuController])
    ], SettlementPage);
    return SettlementPage;
}());
exports.SettlementPage = SettlementPage;
