import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {

  public displayedColumns = ['startTime', 'endTime', 'periodicity', 'interval',
    'format', 'impactOnStressLevel', 'location'];

  public activities: Activity[] = [
  {
    startTime: new Date(),
    endTime: new Date(),
    periodicity: 'каждый вторник',
    interval: '1 час',
    format: 'очный',
    impactOnStressLevel: 50,
    location: 'Ломо',
    activityType: 'учеба',
  },
    {
      startTime: new Date(),
      endTime: new Date(),
      periodicity: 'каждый понедельник',
      interval: '3 часа',
      format: 'дистанционный',
      impactOnStressLevel: 50,
      location: 'Ломо',
      activityType: 'встреча',
    }];

  constructor() { }

  public ngOnInit(): void {
  }

}

export interface Activity {
  activityId?: number;
  startTime: Date;
  endTime: Date;
  periodicity: string;
  interval: string;
  format: FormatType;
  impactOnStressLevel: number;
  location: string;
  activityType: ActivityType;
}

export type FormatType = 'очный' | 'дистанционный';
export type ActivityType = 'учеба' | 'работа' | 'спорт' |
   'магазин' | 'встреча' | 'перемещение' | 'другое' ;
