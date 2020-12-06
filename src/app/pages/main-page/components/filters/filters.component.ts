import {Component, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {ActivityType} from '../../../../models/activity.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {

  constructor() {
  }

  @Input() public startDate: Date;
  @Input() public endDate: Date;
  @Input() public startDate2: Date;
  @Input() public endDate2: Date;
  @Input() public isOffline: boolean;
  @Input() public activityType: ActivityType;
  @Output() public addRowEvent = new EventEmitter();
  // @Input() activeScreen: AppScreen;
  // @Output() filtersChange = new EventEmitter<Filters>();
  // @Output() filtersChangeDate = new EventEmitter<Filters>();

  public filters: Filters;
  public activities = [ 'учебное_занятие' , 'рабочая_смена', 'спортивное_занятие' ,
    'поход_в_магазин' , 'встреча' , 'перемещение' , 'другое' ];

  public ngOnInit(): void {
    this.filters = {
      startDate: this.startDate,
      endDate: this.endDate,
      startDate2: this.startDate2,
      endDate2: this.endDate2,
      isOffline: this.isOffline,
      activityType: this.activityType,
    };
  }

  // changeRollingStockTypeName() {
  //   this.filters.rollingStockNumber = 'Все';
  //   this.filters.rollingStockNumbersList = selectFilterRollingStockNumbersList(this.filters.rollingStockTypeName);
  //   this.change();
  // }
  //
  public changeDate(): void {
    // this.filtersChangeDate.emit(this.filters);
  }
  //
  // change() {
  //   this.filtersChange.emit(this.filters);
  //   // console.log(this.filters);
  // }

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
