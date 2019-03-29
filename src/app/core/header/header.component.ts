import { Component, OnInit } from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as firebase from 'firebase';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CourseDialogComponent } from '../../course-dialog/course-dialog.component';
import { SaveChangesService } from '../../shared/save-changes.service';

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
              private authService: AuthService,
              private dialog: MatDialog,
              private savechanges : SaveChangesService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
      this.savechanges.isChangesSaved = true;
  }

  onFetchData() {
    if(this.savechanges.isChanged)
    {
      this.openDialog("there are changes made do you want to discarde them").subscribe(
        data =>{
          if(data == 1){
            this.dataStorageService.getRecipes();
            this.savechanges.isChanged = false;
            }
          }
        );  
        return;  
    }
  }

  onLogout() {
    if(this.savechanges.edditMode)
    {
      alert("first finich edit/new recipe");    
        return;
    }
    if(this.savechanges.isChanged)
    {
      this.openDialog("do you want to save changes").subscribe(
        data =>{
          if(data == 1){
            this.onSaveData();
            }
            this.authService.logout();
            this.savechanges.isChanged = false;
          }
        );  
        return;  
    }
    this.authService.logout();
  }
  openDialog(message : string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: message
    };

    this.dialog.open(CourseDialogComponent, dialogConfig);
    
    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    
     return dialogRef.afterClosed();
  }
}
