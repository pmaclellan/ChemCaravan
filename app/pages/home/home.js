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
var local_login_1 = require('../local-login/local-login');
var HomePage = (function () {
    function HomePage(nav) {
        this.nav = null;
        this.nav = nav;
    }
    HomePage.prototype.goToLocalLogin = function () {
        console.log('entered goToLocalLogin()');
        this.nav.push(local_login_1.LocalLoginPage);
    };
    HomePage.prototype.goToOnlineLogin = function () {
        alert("Online version not implemented yet!");
    };
    HomePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/home/home.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
