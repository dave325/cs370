import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// Declare the TestFairy instance
declare var TestFairy: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'add'
    },
    {
      title: 'View Cases',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Upload a Case',
      url: '/upload',
      icon: 'cloud-upload'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information'
    },
    {
      title: 'List Users',
      url: '/listUsers',
      icon: 'man'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if ((<any>window).TestFairy) {
        TestFairy.begin("SDK-YVcCMumT");
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
