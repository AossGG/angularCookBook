import { Component, OnInit } from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as firebase from 'firebase';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  loggedIn: boolean;
  uid: string;
  email: string;
  photoURL: string;
  ngOnInit(): void {
    this.loggedIn = false;
    this.uid = "";
    this.photoURL = "";
    this.email = "";
    firebase.auth().onAuthStateChanged( (user) =>{
      if (user) {
        console.log("user id logged in");
        this.loggedIn = true;
        this.uid = user.uid;
        if(user.photoURL === null || user.photoURL===""){
           this.photoURL ="https://www.lindotravel.com/uploads/profile.jpg";
        }
        else{
           this.photoURL = user.photoURL;
        }
        this.email = user.email;
        console.log(this.email + this.photoURL);
      } else {
        this.loggedIn = false;
        this.uid = "";
        this.photoURL = "https://www.lindotravel.com/uploads/profile.jpg";
        this.email = "";
      }
    });  
  }
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
