import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  firebaseUser: firebase.User;
    constructor(private router: Router) {
      let config = {
        apiKey: "AIzaSyAa5GexDlMBVe10R9PHYfvX7CWwDZ7FALg",
        authDomain: "cook-b1b15.firebaseapp.com",
        databaseURL: "https://cook-b1b15.firebaseio.com",
        projectId: "cook-b1b15",
        storageBucket: "cook-b1b15.appspot.com",
        messagingSenderId: "1068868417507"
      };
      firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged( (user) =>{
      if (user) {
        this.firebaseUser = user;
        this.getToken() ;
      } else {
        this.firebaseUser = null;
      }
    });
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
