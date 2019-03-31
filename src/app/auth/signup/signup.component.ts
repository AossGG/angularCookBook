import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }
  failed: boolean;
  message: string;
  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password).catch(
      error => {
        this.failed = true;
        this.message = error.message;
        console.log(error);
      }
    );
  }

}
