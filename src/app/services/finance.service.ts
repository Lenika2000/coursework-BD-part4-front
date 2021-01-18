import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {FinanceElem} from '../models/finance.model';
import {getDateWithoutHours} from './activities.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private readonly http: HttpClient, private authService: AuthService) { }

  getFinances(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get(this.authService.getUrl() + `/finances?start_date=${getDateWithoutHours(startDate)}&end_date=${getDateWithoutHours(endDate)}`, { headers: this.authService.getHeaders()});
  }

  addFinanceElem(financeElem: FinanceElem): Observable<any> {
    const newFinanceElem = {
      type: financeElem.type,
      cost: financeElem.cost,
      item: financeElem.item,
      date: getDateWithoutHours(financeElem.date)
    };
    return this.http.post(this.authService.getUrl() + '/finances', newFinanceElem,
      { headers: this.authService.getHeaders()});
  }

  getBalance(): Observable<any> {
    return this.http.get(this.authService.getUrl() + `/me/balance`, { headers: this.authService.getHeaders()});
  }

  setInitBalance(balance: number): Observable<any> {
    return this.http.put(this.authService.getUrl() + `/me/balance`, {balance},
      { headers: this.authService.getHeaders()});
  }

}
