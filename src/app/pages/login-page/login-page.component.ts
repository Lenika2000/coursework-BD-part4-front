import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}],
    });
  }


  authenticate(): void {
    const user: User = {
      phone: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value
    };
    this.authService.logIn(user).subscribe(() => {
        console.log('успех');
        this.router.navigateByUrl('schedule');
      }, (error) => {
        console.log('невозможно осуществить вход');
      }
    );
  }

  registration(): void {
    this.router.navigateByUrl('registration');
  }
}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
