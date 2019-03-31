import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  failed: boolean;
  message: string;
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.failed = false;
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password).then(
      response => {
        this.router.navigate(['/']);
        this.failed = false;
        this.authService.getToken();
      }
    )
    .catch(
      error => {
        this.failed = true;
        this.message = error.message;
        console.log(error);
      }
    );
    
  }

}
