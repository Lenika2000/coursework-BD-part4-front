import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddActivityDialogComponent} from './add-activity-dialog/add-activity-dialog.component';
import {Activity} from '../../../../models/activity.model';
import {DeleteProductDialogComponent} from '../product-lists/delete-proguct-dialog/delete-product-dialog.component';
import {DeleteActivityDialogComponent} from './delete-activity-dialog/delete-activity-dialog.component';
import {MatTable} from '@angular/material/table';
import {Product} from '../../../../models/shopping.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {

  public displayedColumns = ['startTime', 'endTime', 'periodicity', 'interval',
    'format', 'activityType', 'impactOnStressLevel', 'location', 'update', 'delete'];
  @ViewChild('table', {static: false}) table: MatTable<Product>;
  public activities: Activity[] = [
  {
    startTime: new Date(),
    endTime: new Date(),
    periodicity: 'каждый вторник',
    interval: '1:10',
    format: 'Очный',
    impactOnStressLevel: 50,
    location: 'Ломо',
    activityType: 'Учеба',
    isDone: false
  },
    {
      startTime: new Date(),
      endTime: new Date(),
      periodicity: 'каждый понедельник',
      interval: '1:10',
      format: 'Дистанционный',
      impactOnStressLevel: 50,
      location: 'Ломо',
      activityType: 'Встреча',
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

  updateActivity(activity: Activity): void {

  }

  openDeleteDialog(activity: Activity): void {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.height = '180px';
    deleteDialogConfig.width = '280px';
    deleteDialogConfig.data = activity;

    const dialogConfirmConfigRef = this.dialog.open(DeleteActivityDialogComponent, deleteDialogConfig);

    dialogConfirmConfigRef.componentInstance.activityDelete.subscribe(() => {
      const deletedElemIndex = this.activities.findIndex((d) => d === activity);
      this.activities.splice(deletedElemIndex, 1);
      this.table.renderRows();
      // todo сервер
    });
  }


}

