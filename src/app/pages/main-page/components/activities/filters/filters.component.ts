import {Component, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {ActivityType} from '../../../../../models/activity.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {

  @Output() public addRowEvent = new EventEmitter();

  @Output() filtersChange = new EventEmitter<Filters>();
  @Output() filtersChangeDate = new EventEmitter<Filters>();

  public filters: Filters;
  public activities: ActivityType[] = [ 'Учеба' , 'Работа' , 'Спорт' ,
  'Поход в магазин' , 'Встреча' , 'Другое'];

  campaignStartDate: FormGroup;
  campaignEndDate: FormGroup;

  constructor() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignStartDate = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignEndDate = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }

  public ngOnInit(): void {
    this.filters = {
      startDate: this.campaignStartDate.get('start').value,
      endDate: this.campaignStartDate.get('end').value,
      startDate2: this.campaignEndDate.get('start').value,
      endDate2: this.campaignEndDate.get('end').value,
      isOffline: false,
      activityType: undefined,
    };
  }

  public changeDate(): void {
    this.filtersChangeDate.emit(this.filters);
  }

  change(): void {
    this.filtersChange.emit(this.filters);
  }

  addRow(): void {
    this.addRowEvent.emit();
  }

}

export interface Filters {
  startDate: Date;
  endDate: Date;
  startDate2: Date;
  endDate2: Date;
  isOffline: boolean;
  activityType: ActivityType;
}
