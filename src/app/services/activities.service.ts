import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Activity} from '../models/activity.model';
import {PeriodService} from './period.service';
import {addZeros} from '../pages/main-page/components/activities/add-update-activity-dialog/add-update-activity-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  periodMap = new Map<string, number>();
  constructor(private readonly http: HttpClient, private authService: AuthService,
              private periodService: PeriodService) {
    this.periodMap = this.periodService.getPeriodMap();
  }

  getActivities(): Observable<any> {
    const start_time = new Date();
    const end_time = new Date();
    end_time.setDate(31);
    return this.http.get(this.authService.getUrl() + `/activities?start_time=${start_time.toISOString()}&end_time=${end_time.toISOString()}`, { headers: this.authService.getHeaders()});
  }

  addActivity(addedActivity: Activity): Observable<any> {
    const activity = {
      start_time: addedActivity.start_time.toISOString(),
      end_time: addedActivity.end_time.toISOString(),
      processing_date: `${addedActivity.processing_date.getFullYear()}-${addZeros((addedActivity.processing_date.getMonth() + 1).toString(), 2)}-${ addZeros(addedActivity.processing_date.getDate().toString(), 2)}`, // дата ближайшего выполнения
      duration: getSeconds(addedActivity.duration), // продолжительность
      period: getPeriod(addedActivity.period, this.periodService), // разница в днях между выполнениями активности
      format: addedActivity.format,
      stress_points: addedActivity.stress_points,
      location_id: addedActivity.location,
      activity_type: changeActivityType(addedActivity.activity_type),
      description: addedActivity.description,
      room: addedActivity.room,
      teacher: addedActivity.teacher,
      type: addedActivity.type,
      shopping_list_id: addedActivity.shoppingList?.id
    };
    console.log(activity);
    return this.http.post(this.authService.getUrl() + '/activities', activity,
      { headers: this.authService.getHeaders()});
  }

  deleteActivity(activityId: number): Observable<any> {
    return this.http.delete(this.authService.getUrl() + `/activities/${activityId}`,
      { headers: this.authService.getHeaders()});
  }

  // updateActivity(activity: Activity): Observable<any> {
  //   return this.http.put(this.authService.getUrl() + `/activities/${activity.id}`, {name: location.name},
  //     { headers: this.authService.getHeaders()});
  // }
}

export function getPeriod(period: string, periodMapService: PeriodService): number {
  return periodMapService.getPeriodMap().get(period);
}

export function getSeconds(time: string): number {
  const hours = time.substr(0, time.indexOf(':'));
  const min = time.substr(time.indexOf(':') + 1, time.length - 1);
  return Number(hours) * 60 * 60 + Number(min) * 60;
}

export function changeActivityType(activityType: string): string{
  switch (activityType) {
    case 'Учеба': {
      return 'studying';
    }
    case 'Спорт' : {
      return 'sport';
    }
    case 'Другое' : {
      return 'other';
    }
    case 'Поход в магазин' : {
      return 'shopping';
    }
    case 'Встреча' : {
      return 'meeting';
    }
    case 'Работа' : {
      return 'work';
    }
  }
}

