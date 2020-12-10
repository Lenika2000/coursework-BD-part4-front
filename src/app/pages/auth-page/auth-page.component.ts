import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';

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
    const user: User = {
      phone: this.authForm.get('login').value,
      password: this.authForm.get('password').value
    };
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
