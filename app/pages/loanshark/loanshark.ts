import {Component} from '@angular/core';
import {NavController, NavParams, Alert} from 'ionic-angular';
import {Player} from '../../providers/classes/player';
import {SqlService} from '../../providers/services/sql-storage-service';

@Component({
  templateUrl: 'build/pages/loanshark/loanshark.html',
  providers: [SqlService]
})
export class LoansharkPage {
  private nav: NavController;
  private navParams: NavParams;
  private sqlService: SqlService;
  private player: Player;
  private amount: number;
  private creditLimit: number;
  private message: string;
  private loanTaken: boolean;
  private paymentMade: boolean;
  private oneTimeLoan: boolean;
  private noMoreCharity: boolean;

  constructor(nav: NavController, navParams: NavParams, sqlService: SqlService) {
    this.nav = nav;
    this.navParams = navParams;
    this.sqlService = sqlService;
    this.player = navParams.get('player');
    this.amount = 0;
    this.creditLimit = this.player.netWorth();
    if (this.creditLimit < 5000) {
      this.creditLimit = 5000;
      this.oneTimeLoan = true;
    } else {
      this.oneTimeLoan = false;
    }
    this.noMoreCharity = false;
    this.loanTaken = false;
    this.paymentMade = false;
  }

  //TODO: this is ugly, clean it up
  pay(paymentAmount: number) {
    //do some bounds checking for error messages
    if (paymentAmount <= 0) {
      this.presentErrorAlert("amount must be positive");
    } else if (paymentAmount > this.player.caps) {
      this.presentErrorAlert("you don't ahve enough caps");
    } else if (paymentAmount > this.player.debt) {
      this.presentErrorAlert("that's more than you owe");
    } else {
      //reset counters on sufficient payment
      if (paymentAmount > this.player.debt / 2) {
        this.player.beatenOnce = false;
        this.player.beatenTwice = false;
        this.player.ageOfDebt = 0;
      }
      
      //perform the pay transaction
      this.player.caps -= Number(paymentAmount);
      this.player.debt -= Number(paymentAmount);
      this.sqlService.savePlayerState(this.player);

      //set the state accordingly
      this.loanTaken = false;
      this.paymentMade = true;
    }
  }

  loan(loanAmount: number) {
    //do some bounds checking for error messages
    if (loanAmount <= 0) {
      this.presentErrorAlert("amount must be positive");
    } else if (loanAmount > this.creditLimit) {
      this.presentErrorAlert("you can only borrow " + this.creditLimit + " caps");
    } else if (this.noMoreCharity) {
      this.presentErrorAlert("you've already taken your charity loan");
    } else {
      //perform the loan transaction
      this.player.caps += Number(loanAmount);
      this.player.debt += Number(loanAmount);
      this.sqlService.savePlayerState(this.player);

      //set state accordingly
      this.paymentMade = false;
      this.loanTaken = true;
      if (this.oneTimeLoan) {
        this.creditLimit -= Number(loanAmount);
        if (this.creditLimit <= 0) {
          this.noMoreCharity = true;
        }
      }
    }
  }

  presentErrorAlert(msg: string) {
    let alert = Alert.create({
      title: 'Error',
      message: msg,
      buttons: ['OK']
    });
    this.nav.present(alert);
  }
}