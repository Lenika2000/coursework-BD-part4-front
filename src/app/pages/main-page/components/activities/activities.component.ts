import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddUpdateActivityDialogComponent} from './add-activity-dialog/add-update-activity-dialog.component';
import {Activity} from '../../../../models/activity.model';
import {DeleteActivityDialogComponent} from './delete-activity-dialog/delete-activity-dialog.component';
import {MatTable} from '@angular/material/table';
import {Product} from '../../../../models/shopping.model';
import {Filters} from './filters/filters.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {

  public displayedColumns = ['startTime', 'endTime', 'periodicity', 'interval',
    'format', 'activityType', 'impactOnStressLevel', 'location', 'update', 'delete'];
  @ViewChild('table', {static: false}) table: MatTable<Product>;
  selectedActivity: any;
  filteredTableData: any[];
  public activities: any = [
  {
    startTime: new Date(),
    endTime: new Date(),
    periodicity: 'Каждый день',
    interval: '1:10',
    format: 'Очный',
    impactOnStressLevel: 50,
    location: 'Магнит',
    activityType: 'Учеба',
    isDone: false,
    room: 223,
    teacher: 'Клименков',
    type: 'Лекция',
  },
    {
      startTime: new Date(),
      endTime: new Date(),
      periodicity: 'Каждый день',
      interval: '1:10',
      format: 'Дистанционный',
      impactOnStressLevel: 50,
      location: 'Магнит',
      activityType: 'Встреча',
      isDone: false,
      humanName: 'Женя'
    }];

  constructor( private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.filteredTableData = this.activities;
  }

  openAddUpdateDialog(isAddOperation: boolean, activity: any): MatDialogRef<AddUpdateActivityDialogComponent, any>  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      activity,
      isAddOperation
    };
    if (!isAddOperation) {
      this.selectedActivity = activity;
    }
    return this.dialog.open(AddUpdateActivityDialogComponent, dialogConfig);
  }

  addActivity(): void {
    const activity = {
      startTime: new Date(),
      endTime: new Date(),
      periodicity: 'Каждый день',
      interval: '',
      format: 'Очный',
      impactOnStressLevel:  '',
      location: '',
      activityType: ''
    };
    activity.startTime.setHours(8, 0, 0, 0);
    activity.endTime.setHours(15, 0, 0, 0);
    const dialogRef = this.openAddUpdateDialog(true, activity);

    dialogRef.componentInstance.activityAdd.subscribe((newRow) => {
      this.activities.push(newRow);
      this.table.renderRows();
      // todo сервер
    });
  }

  updateActivity(activity: Activity): void {
    this.selectedActivity = activity;
    const dialogRef = this.openAddUpdateDialog(false, activity);

    dialogRef.componentInstance.activityUpdate.subscribe((updatedActivity) => {

      this.selectedActivity.startTime = updatedActivity.startTime;
      this.selectedActivity.endTime = updatedActivity.endTime;
      this.selectedActivity.periodicity = updatedActivity.periodicity;
      this.selectedActivity.interval = updatedActivity.interval;
      this.selectedActivity.format = updatedActivity.format;
      this.selectedActivity.impactOnStressLevel = updatedActivity.impactOnStressLevel;
      this.selectedActivity.location = updatedActivity.location;
      this.selectedActivity.activityType = updatedActivity.activityType;
      switch (this.selectedActivity.activityType) {
        case 'Учеба': {
          this.selectedActivity.teacher = updatedActivity.teacher;
          this.selectedActivity.room = updatedActivity.room;
          this.selectedActivity.lessonType = updatedActivity.lessonType;
          break;
        }
        case 'Спорт' : {
          this.selectedActivity.sportType = updatedActivity.sportType;
          break;
        }
        case 'Другое' : {
          this.selectedActivity.description = updatedActivity.description;
          break;
        }
        case 'Поход в магазин' : {
          this.selectedActivity.shopListName = updatedActivity.shoppingListName;
          break;
        }
        case 'Встреча' : {
          this.selectedActivity.humanName = updatedActivity.humanName;
          break;
        }
      }
      this.table.renderRows();
      // todo сервер
    });
  }

  openDeleteDialog(activity: Activity): void {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.height = '190px';
    deleteDialogConfig.width = '300px';
    deleteDialogConfig.data = activity;

    const dialogConfirmConfigRef = this.dialog.open(DeleteActivityDialogComponent, deleteDialogConfig);

    dialogConfirmConfigRef.componentInstance.activityDelete.subscribe(() => {
      const deletedElemIndex = this.activities.findIndex((d) => d === activity);
      this.activities.splice(deletedElemIndex, 1);
      this.table.renderRows();
      // todo сервер
    });
  }

  getAdditionalInfo(index): string {
    return getAdditionalInfo(index, this.activities);
  }


  applyDateFilters(filters: Filters): void {
    this.filteredTableData = this.activities;
    // todo запрос на сервер
    // this.filteredTableData = this.filteredTableData.filter((row) => {
    //   return row.startTime < filters.endDate && row.startTime> === 'Дистанционный';
    // });
  }


  filterTableData(filters: Filters): void {
    this.filteredTableData = this.activities;
    if (filters.isOffline) {
      this.filteredTableData = this.filteredTableData.filter((row) => {
        return row.format === 'Очный';
      });
    }
    if (filters.activityType !== undefined) {
      this.filteredTableData = this.filteredTableData.filter((row) => {
        return row.activityType === filters.activityType;
      });
    }
  }
}

export function getAdditionalInfo(index: number, activities: any[]): string {
  const hoverActivity = activities[index];
  switch (hoverActivity.activityType) {
    case 'Встреча':
      return `Встреча с ${hoverActivity.humanName}`;
    case 'Учеба':
      return `Аудитория - ${hoverActivity.room}\nПреподаватель - ${hoverActivity.teacher}\nТип - ${hoverActivity.type}`;
    case 'Спорт':
      return `Тип занятия - ${hoverActivity.sportType}`;
    case 'Другое':
      return `Описание - ${hoverActivity.description}`;
    case 'Поход в магазин':
      return `Название списка покупок - ${hoverActivity.shopListName}`;
  }
}
