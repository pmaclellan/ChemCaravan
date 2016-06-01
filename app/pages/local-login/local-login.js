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
var settlement_service_1 = require('../../providers/services/settlement-service');
var settlement_page_1 = require('../settlement-page/settlement-page');
var player_1 = require('../../providers/classes/player');
var LocalLoginPage = (function () {
    function LocalLoginPage(nav, sqlService, settlementService) {
        var _this = this;
        this.nav = nav;
        this.sqlService = new sql_storage_service_1.SqlService();
        this.showSignup = false;
        this.sqlService.loadPlayerState().then(function (playerState) {
            console.log('player loaded: ' + playerState);
            //create the Player object if a stored state was successfully retrieved
            if (playerState) {
                var playerShadow = JSON.parse(playerState);
                _this.player = new player_1.Player(playerShadow.name, playerShadow);
            }
        }, function (error) {
            console.error('Failed to load player state', error);
        });
        this.settlementService = new settlement_service_1.SettlementService();
    }
    LocalLoginPage.prototype.continue = function () {
        var last_known_whereabouts = this.player.location;
        var player_location = this.settlementService.getSettlement(last_known_whereabouts);
        // pass the loaded player state to initialize the settlement
        this.nav.setRoot(settlement_page_1.SettlementPage, {
            player: this.player,
            settlement: player_location
        });
    };
    LocalLoginPage.prototype.startNewGame = function () {
        //TODO: a warning popup would be nice here
        this.sqlService.clearPlayerState();
        console.log('start a new game');
        this.showSignup = true;
    };
    LocalLoginPage.prototype.createPlayer = function (name) {
        this.player = new player_1.Player(name);
        console.log('player created: ' + name);
        this.sqlService.savePlayerState(this.player);
        console.log('player saved');
        this.continue();
    };
    LocalLoginPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/local-login/local-login.html',
            providers: [sql_storage_service_1.SqlService, settlement_service_1.SettlementService]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, sql_storage_service_1.SqlService, settlement_service_1.SettlementService])
    ], LocalLoginPage);
    return LocalLoginPage;
}());
exports.LocalLoginPage = LocalLoginPage;
