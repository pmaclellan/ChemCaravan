import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {SqlService} from './services/sql-storage-service'

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [SqlService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = HomePage;
  platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
