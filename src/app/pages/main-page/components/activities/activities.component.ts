import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddUpdateActivityDialogComponent} from './add-update-activity-dialog/add-update-activity-dialog.component';
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
  public activities: any = [
  {
    start_time: new Date(),
    end_time: new Date(),
    period: 'Каждый день',
    duration: '1:10',
    format: 'Очный',
    stress_points: 50,
    location: {id: 0, name: 'Магнит'},
    activity_type: 'Учеба',
    isDone: false,
    room: 223,
    teacher: 'Клименков',
    type: 'Лекция',
  },
    {
      start_time: new Date(),
      end_time: new Date(),
      period: 'Каждый день',
      duration: '1:10',
      format: 'Дистанционный',
      stress_points: 50,
      location: {id: 0, name: 'Магнит'},
      activity_type: 'Встреча',
      isDone: false,
      humanName: 'Женя'
    }];

  constructor( private dialog: MatDialog,
               private activitiesService: ActivitiesService,
               private periodService: PeriodService) { }

  public ngOnInit(): void {
    this.activities = this.filteredTableData = this.activities;
  }

  getActivities(): void {
    this.activitiesService.getActivities().subscribe( (activities: ServerActivity[]) => {
      this.activities = this.prepareActivityData(activities);
    });
  }

  // todo не хватает полей
  prepareActivityData(activities: ServerActivity[]): Activity[] {
    return activities.map(entry => {
      return {
        id: entry.id,
        start_time: entry.start_time,
        end_time: entry.end_time,
        processing_date: new Date(entry.processing_date),
        duration: getCorrectTime(entry.duration),
        period: getCorrectPeriod(entry.period, this.periodService),
        format: entry.format,
        stress_points: entry.stress_points,
        location: getLocation(entry.location_id),
        activity_type: changeActivityTypeFromServer(entry.activity_type),
        description: entry.description,
        room: entry.room,
        teacher: entry.teacher,
        type: entry.type,
        shoppingList: undefined,
      };
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
      format: 'Очный',
      stress_points:  '',
      location: '',
      activity_type: ''
    };
    activity.start_time.setHours(8, 0, 0, 0);
    activity.end_time.setHours(15, 0, 0, 0);
    const dialogRef = this.openAddUpdateDialog(true, activity);

    dialogRef.componentInstance.activityAdd.subscribe((newRow) => {
      this.activitiesService.addActivity(newRow).subscribe(() => {
        this.activities.push(newRow);
        this.table.renderRows();
      });
    });
  }

  updateActivity(activity: Activity): void {
    this.selectedActivity = activity;
    const dialogRef = this.openAddUpdateDialog(false, activity);

    dialogRef.componentInstance.activityUpdate.subscribe((updatedActivity) => {
      this.selectedActivity.start_time = updatedActivity.start_time;
      this.selectedActivity.end_time = updatedActivity.end_time;
      this.selectedActivity.period = updatedActivity.period;
      this.selectedActivity.duration = updatedActivity.duration;
      this.selectedActivity.format = updatedActivity.format;
      this.selectedActivity.stress_points = updatedActivity.stress_points;
      this.selectedActivity.location = updatedActivity.location;
      this.selectedActivity.activity_type = updatedActivity.activity_type;
      switch (this.selectedActivity.activity_type) {
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
    if (filters.activity_type !== undefined) {
      this.filteredTableData = this.filteredTableData.filter((row) => {
        return row.activity_type === filters.activity_type;
      });
    }
  }
}

export function getAdditionalInfo(index: number, activities: any[]): string {
  const hoverActivity = activities[index];
  switch (hoverActivity.activity_type) {
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

export function getCorrectPeriod(period: number, periodMapService: PeriodService): string {
  return periodMapService.getPeriodMapFromServer().get(period);
}

export  function getCorrectTime(seconds: number): string {
  const hours = seconds / 60 / 60;
  const min = (seconds - 60 * 60 * hours) / 60;
  return hours + ':' + min;
}

export function getLocation(locationId: number): Location {
  const locations = JSON.parse(localStorage.getItem('part4.locations'));
  locations.forEach(( (location: Location) => {
    if (location.id === locationId) {
      return location;
    }
  }));
  return ;
}

export function getShoppingList(shoppingListId: number): ShoppingList {
  const shoppingLists = JSON.parse(localStorage.getItem('part4.shopping.lists'));
  shoppingLists.forEach(( (shoppingList: ShoppingList) => {
    if (shoppingList.id === shoppingListId) {
      return shoppingList;
    }
  }));
  return ;
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
