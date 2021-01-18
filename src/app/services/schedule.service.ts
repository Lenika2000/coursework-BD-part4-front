import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, Subject} from 'rxjs';
import {addZeros} from '../pages/main-page/components/activities/add-update-activity-dialog/add-update-activity-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private readonly http: HttpClient, private authService: AuthService) { }
  public updateStressLvlSubject: Subject<any> = new Subject<any>();

  getSchedule(date: Date): Observable<any> {
    return this.http.get(this.authService.getUrl() + `/me/schedule?sch_date=${date.getFullYear()}-${addZeros((date.getMonth() + 1).toString(), 2)}-${ addZeros(date.getDate().toString(), 2)}`, { headers: this.authService.getHeaders()});
  }

  setActivityComplete(activityId: number): void {
    this.http.post(this.authService.getUrl() + `/activities/${activityId}/complete`, '',
      { headers: this.authService.getHeaders()}).subscribe(() => {
        this.updateStressLvlSubject.next();
    });
  }

}
