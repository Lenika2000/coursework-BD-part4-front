import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddUpdateActivityDialogComponent, addZeros} from './add-update-activity-dialog/add-update-activity-dialog.component';
import {Activity, ActivityType, Location, ServerActivity} from '../../../../models/activity.model';
import {DeleteActivityDialogComponent} from './delete-activity-dialog/delete-activity-dialog.component';
import {MatTable} from '@angular/material/table';
import {Product, ShoppingList} from '../../../../models/shopping.model';
import {Filters} from './filters/filters.component';
import {ActivitiesService} from '../../../../services/activities.service';
import {PeriodService} from '../../../../services/period.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {

  public displayedColumns = ['start_time', 'end_time', 'period', 'processing_date', 'duration',
    'format', 'activity_type', 'stress_points', 'location', 'update', 'delete'];
  @ViewChild('table', {static: false}) table: MatTable<Product>;
  selectedActivity: any;
  filteredTableData: any[];
  public activities: any[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor( private dialog: MatDialog,
               private activitiesService: ActivitiesService) { }

  public ngOnInit(): void {
    this.endDate.setMonth(this.startDate.getMonth() + 1);
    this.getActivities();
  }

  getActivities(): void {
    this.activitiesService.getActivities(this.startDate, this.endDate).subscribe( (activities: ServerActivity[]) => {
       this.activities = this.filteredTableData =  prepareActivityData(activities, false);
    });
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
      start_time: new Date(),
      end_time: new Date(),
      period: 'Каждый день',
      duration: '',
      format: 'очный',
      stress_points:  '',
      location: '',
      activity_type: ''
    };
    activity.start_time.setHours(8, 0, 0, 0);
    activity.end_time.setHours(15, 0, 0, 0);
    const dialogRef = this.openAddUpdateDialog(true, activity);

    dialogRef.componentInstance.activityAdd.subscribe((newRow) => {
      this.activitiesService.addActivity(newRow).subscribe(() => {
        this.getActivities();
      });
    });
  }

  updateActivity(activity: Activity): void {
    this.selectedActivity = activity;
    const dialogRef = this.openAddUpdateDialog(false, activity);

    dialogRef.componentInstance.activityUpdate.subscribe((updatedActivity) => {
      this.activitiesService.updateActivity(updatedActivity, activity.id).subscribe(() => {
        this.getActivities();
      });
    });
  }

  openDeleteDialog(activity: Activity): void {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.height = '190px';
    deleteDialogConfig.width = '300px';
    deleteDialogConfig.data = activity;

    const dialogConfirmConfigRef = this.dialog.open(DeleteActivityDialogComponent, deleteDialogConfig);

    dialogConfirmConfigRef.componentInstance.activityDelete.subscribe(() => {
      this.activitiesService.deleteActivity(activity.id).subscribe(() => {
        const deletedElemIndex = this.activities.findIndex((d) => d === activity);
        this.activities.splice(deletedElemIndex, 1);
        this.table.renderRows();
      });
    });
  }

  getAdditionalInfo(index): string {
    return getAdditionalInfo(index, this.activities);
  }

  applyDateFilters(filters: Filters): void {
    this.startDate = filters.startDate;
    this.endDate = filters.endDate;
    this.getActivities();
  }


  filterTableData(filters: Filters): void {
    this.filteredTableData = this.activities;
    if (filters.isOffline) {
      this.filteredTableData = this.filteredTableData.filter((row) => {
        return row.format === 'очный';
      });
    }
    if (filters.activity_type !== undefined) {
      if (filters.activity_type.localeCompare('Все') !== 0) {
        this.filteredTableData = this.filteredTableData.filter((row) => {
          return row.activity_type === filters.activity_type;
        });
      }
    }
  }
}

export function prepareActivityData(activities: ServerActivity[], isPrepareSchedule: boolean): Activity[] {
  return activities.map(entry => {
    return {
      id: entry.id,
      start_time: new Date(entry.start_time),
      end_time: (isPrepareSchedule) ? getEndTimeForSchedule(entry.start_time, entry.duration) : new Date(entry.end_time),
      processing_date: new Date(entry.processing_date),
      duration: getCorrectTime(entry.duration),
      period: getCorrectPeriod(entry.period),
      format: entry.format,
      stress_points: entry.stress_points,
      location: getLocation(entry.location_id),
      activity_type: changeActivityTypeFromServer(entry.activity_type),
      description: entry.description,
      room: entry.room,
      teacher: entry.teacher,
      type: entry.type,
      completed: entry.completed === 'выполнено',
      shoppingList: getShoppingList(entry.shopping_list_id),
    };
  });
}

export function getAdditionalInfo(index: number, activities: any[]): string {
  const hoverActivity = activities[index];
  switch (hoverActivity.activity_type) {
    case 'Встреча':
      return `Встреча с ${hoverActivity.humanName}`;
    case 'Учеба':
      return `Аудитория - ${hoverActivity.room}\nПреподаватель - ${hoverActivity.teacher}\nТип - ${hoverActivity.type}`;
    case 'Спорт':
      return `Тип занятия - ${hoverActivity.type}`;
    case 'Другое':
      return `Описание - ${hoverActivity.description}`;
    case 'Поход в магазин':
      return `Название списка покупок - ${hoverActivity.shoppingList?.name}`;
  }
}

export function getCorrectPeriod(period: number): string {
  if (period === null) {
    return 'Без повтора';
  }
  return PeriodService.getPeriodMapFromServer().get(period);
}

export  function getEndTimeForSchedule(startTime: Date, seconds: number): Date {
  const endTime = new Date(startTime);
  const hours = Math.floor(seconds / (60 * 60));
  const min = (seconds - 60 * 60 * hours) / 60;
  endTime.setHours(endTime.getHours() + hours, endTime.getMinutes() + min);
  return endTime;
}

export  function getCorrectTime(seconds: number): string {
  let hours;
  if (seconds / 60 / 60 < 1) {
    hours = 0;
  } else {
    hours = Math.floor(seconds / (60 * 60));
  }
  const min = (seconds - 60 * 60 * hours) / 60;
  return addZeros(hours.toString(), 2) + ':' + addZeros(min.toString(), 2);
}

export function getLocation(locationId: number): Location {
  const locations = JSON.parse(localStorage.getItem('part4.locations'));
  for ( const location of locations) {
    if (location.id === locationId) {
      return location;
    }
  }
  return undefined;
}

export function getShoppingList(shoppingListId: number): ShoppingList {
  const shoppingLists = JSON.parse(localStorage.getItem('part4.shopping.lists'));
  for ( const shop of shoppingLists) {
    if (shop.id === shoppingListId) {
      return shop;
    }
  }
  return undefined;
}

export function changeActivityTypeFromServer(activityType: string): ActivityType{
  switch (activityType) {
    case 'studying': {
      return 'Учеба';
    }
    case 'sport' : {
      return 'Спорт';
    }
    case 'other' : {
      return 'Другое';
    }
    case 'shopping' : {
      return 'Поход в магазин';
    }
    case 'meeting' : {
      return 'Встреча';
    }
    case 'work' : {
      return 'Работа';
    }
  }
}
