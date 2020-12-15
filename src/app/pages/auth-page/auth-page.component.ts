import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material/core';

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

  // логин не существует-аутентификация, уже есть пользователь с таким логином - регистрация
  isLoginIncorrect = false;
  isPasswordIncorrect = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      login: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}],
    });
  }


  authenticate(): void {
     // this.isPasswordIncorrect = ! this.isPasswordIncorrect;
     // this.isLoginIncorrect = ! this.isLoginIncorrect;
    // const user: User = {
    //   phone: this.authForm.get('login').value,
    //   password: this.authForm.get('password').value
    // };
    // this.authService.logIn(user).subscribe(() => {
    //     console.log('успех');
    this.router.navigateByUrl('schedule');
    //   }, (error) => {
    //     console.log('невозможно осуществить вход');
    //   }
    // );
  }

  goToRegistration(): void {
    this.isLoginPage = false;
  }

  registration(): void {
    const user: User = {
      phone: this.authForm.get('login').value,
      password: this.authForm.get('password').value
    };
    this.authService.createAccount(user).subscribe(() => {
      this.errorMessage = '';
      this.goToLogIn();
    }, (err: HttpErrorResponse) => {
      console.log(err);
      switch (err.status) {
        case 0:
          this.errorMessage = 'Невозможно подключиться к серверу';
          break;
        case 401:
          this.errorMessage = 'Введен неверный логин или пароль';
          break;
        default:
          this.errorMessage = 'Неизвестная ошибка ' + err.status;
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
