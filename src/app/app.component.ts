import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyDN6WmBnJGfN64BnR-r4TW9V8N1IHgps1w",
      authDomain: "chatapp-3f829.firebaseapp.com",
      databaseURL: "https://chatapp-3f829.firebaseio.com",
      projectId: "chatapp-3f829",
      storageBucket: "chatapp-3f829.appspot.com",
      messagingSenderId: "845839389008"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

