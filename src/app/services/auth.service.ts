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
  private url = 'http://92.63.193.30:8000';

  constructor(private http: HttpClient, private router: Router) { }

  getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return headers;
  }

  getUrl(): string {
    return this.url;
  }

  createAccount(user: User): Observable<any> {
    return this.http.post(this.url + '/signup', JSON.stringify(user));
  }

  public logIn(user: User): Observable<any> {
    return this.http.post(this.url + '/auth', user)
      .pipe(tap(data => {
        const token = (data as ResponseMessage).token;
        /*Сохранение информации о пользователе*/
        localStorage.setItem('part4.authToken', token as string);
        localStorage.setItem('part4.currentUser', JSON.stringify(user.login));
        this.authenticated = true;
      }, error => {
        console.log('login error: ' + error);
      }));
  }

}

export interface ResponseMessage {
  token: string;
}
