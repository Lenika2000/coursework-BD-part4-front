import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      firstName: [],
      lastName: [],
    });
  }


  authenticate(): void {
    this.router.navigateByUrl('schedule');
  }

  registration(): void {
    this.router.navigateByUrl('registration');
  }
}
