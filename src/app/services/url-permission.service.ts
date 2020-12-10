import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UrlPermissionService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthorized: boolean = localStorage.getItem('currentUser') != null;
    console.log(isAuthorized);
    console.log(state.url);
    /*если пользователь не авторизован и если мы переходим на страницу с расписанием, то redirect на аутентификацию*/
    if (!isAuthorized && state.url.search('schedule') !== -1) {
      this.router.navigateByUrl('login');
      return false;
      /*если пользователь авторизован и если мы переходим на страницу аутентификации(вводим в адресную строку),
      то redirect на страницу с расписанием(не дает уйти)*/
    } else if (isAuthorized && state.url.search('login') !== -1) {
      this.router.navigateByUrl('schedule');
      return false;
    }
    return true;
  }

}
