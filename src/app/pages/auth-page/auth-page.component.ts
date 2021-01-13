import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material/core';
import {SnackBarService} from '../../services/snack-bar.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  authForm: FormGroup;
  isLoginPage = true;
  errorMessage: string;
  hide = true;

  isAuthenticationError = false;
  isLoginAlreadyExists = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService, private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      login: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}],
    });
  }

  authenticate(): void {
    const user: User = {
      login: this.authForm.get('login').value,
      password: this.authForm.get('password').value
    };
    this.authService.logIn(user).subscribe(() => {
        this.router.navigateByUrl('schedule');
      }, (error) => {
        this.isAuthenticationError = true;
        console.log('Невозможно осуществить вход');
      }
    );
  }

  goToRegistration(): void {
    this.isLoginPage = false;
  }

  registration(): void {
    const user: User = {
      login: this.authForm.get('login').value,
      password: this.authForm.get('password').value
    };
    this.authService.createAccount(user).subscribe(() => {
      this.errorMessage = '';
      this.authenticate();
    }, (err: HttpErrorResponse) => {
      console.log(err);
      switch (err.status) {
        case 0:
          this.snackBarService.openSnackBar('Невозможно подключиться к серверу');
          break;
        case 400:
          this.isLoginAlreadyExists = true;
          break;
        case 422:
          this.snackBarService.openSnackBar('Ошибка валидации');
          break;
        default:
          this.snackBarService.openSnackBar('Неизвестная ошибка ' + err.status);
      }
    });
  }

  goToLogIn(): void {
    this.isLoginPage = true;
  }
}

// Error when invalid control is dirty or touched
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && !control.valid && (control.dirty || control.touched));
  }
}
