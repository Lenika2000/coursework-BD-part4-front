import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddActivityDialogComponent} from './add-activity-dialog/add-activity-dialog.component';
import {Activity} from '../../../../models/activity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {

  public displayedColumns = ['startTime', 'endTime', 'periodicity', 'interval',
    'format', 'activityType', 'impactOnStressLevel', 'location'];

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
    isDone: false
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
      isDone: false
    }];

  constructor( private dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  openAddDialog(): void {
    const addDialogConfig = new MatDialogConfig();
    // addDialogConfig.width = '400px';
    const dialogRef = this.dialog.open(AddActivityDialogComponent, addDialogConfig);

    dialogRef.componentInstance.logbookRowAdd.subscribe((newRow) => {
    });
  }
}

