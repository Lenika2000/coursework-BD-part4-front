import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated = false;
  private url = 'http://35.228.254.42:8080';

  constructor(private http: HttpClient, private router: Router) { }

  private getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return headers;
  }

  createAccount(user: User): Observable<any> {
    user.sex = 'F';
    user.name = 'Lena';
    user.surname = 'Manshina';
    return this.http.post(this.url + '/api/auth/signup', user);
  }

  public logIn(user: User): Observable<any> {
    return this.http.post(this.url + '/api/auth/signin', user)
      .pipe(tap(data => {
        console.log(data)
        const token = (data as ResponseMessage).accessToken;
        /*Сохранение информации о пользователе*/
        localStorage.setItem('authToken', token as string);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authenticated = true;
      }, error => {
        console.log('login error: ' + error);
      }));
  }

  // logOut() {
  //   const user: User = JSON.parse(localStorage.getItem('currentUser'));
  //
  //   return this.http.post(this.url + '/users/logout', user, {headers: this.getHeaders()}).subscribe(
  //     data => {
  //       this.authenticated = false;
  //     },
  //     error => {
  //       console.log('logout error: ' + error);
  //     })
  //     // Действия, которые делаем в самом конце
  //     .add(() => {
  //       localStorage.removeItem('authToken');
  //       localStorage.removeItem('currentUser');
  //       // Надо обновить страницу, чтобы стили корректно подгрузились и так как данных о пользователе уже нет
  //       // будет автоматический редирект на страницу логина
  //       window.location.reload();
  //     });
  // }

}

export interface ResponseMessage {
  phone: string;
  roles: string[];
  accessToken: string;
}
