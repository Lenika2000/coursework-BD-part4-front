import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, Subject} from 'rxjs';
import {getDateWithoutHours} from './activities.service';
import {FinanceService} from './finance.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private readonly http: HttpClient, private authService: AuthService, private financeService: FinanceService) { }
  public updateStressLvlSubject: Subject<any> = new Subject<any>();

  getSchedule(date: Date): Observable<any> {
    return this.http.get(this.authService.getUrl() + `/me/schedule?sch_date=${getDateWithoutHours(date)}`, { headers: this.authService.getHeaders()});
  }

  setActivityComplete(activityId: number, isCompleted: boolean): void {
    this.http.post(this.authService.getUrl() + `/activities/${activityId}/complete`, {completed: isCompleted},
      { headers: this.authService.getHeaders()}).subscribe(() => {
        this.updateStressLvlSubject.next();
        this.financeService.setBalanceSubject.next();
    });
  }

}
