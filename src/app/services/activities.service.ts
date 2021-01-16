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

  getActivities(startTime: Date, endTime: Date ): Observable<any> {
    return this.http.get(this.authService.getUrl() + `/activities?start_time=${startTime.toISOString()}&endTime=${endTime.toISOString()}`, { headers: this.authService.getHeaders()});
  }

  addActivity(addedActivity: Activity): Observable<any> {
    return this.http.post(this.authService.getUrl() + '/activities', this.prepareActivityToServer(addedActivity),
      { headers: this.authService.getHeaders()});
  }

  deleteActivity(activityId: number): Observable<any> {
    return this.http.delete(this.authService.getUrl() + `/activities/${activityId}`,
      { headers: this.authService.getHeaders()});
  }

  updateActivity(updatedActivity: Activity): Observable<any> {
    console.log( this.prepareActivityToServer(updatedActivity));
    return this.http.put(this.authService.getUrl() + `/activities/${updatedActivity.id}`,
      this.prepareActivityToServer(updatedActivity),
      { headers: this.authService.getHeaders()});
  }

  prepareActivityToServer(activity: Activity): any {
    return {
      start_time: activity.start_time.toISOString(),
      end_time: activity.end_time.toISOString(),
      processing_date: `${activity.processing_date.getFullYear()}-${addZeros((activity.processing_date.getMonth() + 1).toString(), 2)}-${ addZeros(activity.processing_date.getDate().toString(), 2)}`, // дата ближайшего выполнения
      duration: getSeconds(activity.duration), // продолжительность
      period: getPeriod(activity.period, this.periodService), // разница в днях между выполнениями активности
      format: activity.format,
      stress_points: activity.stress_points,
      location_id: activity.location,
      activity_type: changeActivityType(activity.activity_type),
      description: activity.description,
      room: activity.room,
      teacher: activity.teacher,
      type: activity.type,
      shopping_list_id: activity.shoppingList
    };
  }
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

