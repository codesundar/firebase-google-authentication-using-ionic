import { Component } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import * as firebase from 'firebase';

import { GooglePlus } from '@ionic-native/google-plus';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isUserLoggedIn: any = false;
  userData: any = {};

  constructor(public toastCtrl: ToastController, public platform: Platform, public googleplus: GooglePlus) {
    firebase.auth().onAuthStateChanged(authData => {
      if (authData != null) {
        this.isUserLoggedIn = true;
        this.userData = authData;
        console.log(authData);
      } else {
        this.userData = {};
      }
    });
  }



  logout() {
    firebase.auth().signOut();
  }

  displayToast(message) {
    this.toastCtrl.create({ message, duration: 3000 }).present();
  }



  googleLogin() {
    
    // browser login
    if (this.platform.is('core')) {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(gpRes => {
        this.displayToast('Login Success')
        this.userData = gpRes.additionalUserInfo.profile;
      }).catch(err => this.displayToast(err));
    }

    // cordova login
    else {
      this.googleplus.login({
        'webClientId': '...'
      }).then((success) => {
        console.log(success);
        let credential = firebase.auth.GoogleAuthProvider.credential(success['idToken'], null);
        firebase.auth().signInWithCredential(credential).then((data) => {
          console.log(data);
        }).catch((err) => this.displayToast(err));
      }, err => this.displayToast(err));
    }
  }
}
