import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  registrationForm: FormGroup;
  errorMessage: string;
  hide = true;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      login: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}],
    });
  }

  registration(): void {
    const user: User = {
      phone: this.registrationForm.get('login').value,
      password: this.registrationForm.get('password').value
    };
    this.authService.createAccount(user).subscribe(() => {
      this.errorMessage = '';
      this.router.navigateByUrl('login');
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
}
