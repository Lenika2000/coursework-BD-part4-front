import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Product} from '../../../../models/shopping.model';
import { getAdditionalInfo } from '../activities/activities.component';
import {GroupByData} from '../../../../models/activity.model';
import {of} from 'rxjs';
import {pairwise, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public displayedColumns = ['startTime', 'interval', 'format', 'activityType', 'impactOnStressLevel',
    'location', 'isConfirm'];
  @ViewChild('table', {static: false}) table: MatTable<Product>;
  groupedData: Array<any> = new Array<any>();

  public activities: any = [
    {
      startTime: new Date(),
      endTime: new Date(),
      periodicity: 'каждый вторник',
      interval: '1:10',
      format: 'Очный',
      impactOnStressLevel: 50,
      location: 'Ломо',
      activityType: 'Учеба',
      isDone: false,
      room: 223,
      teacher: 'Клименков',
      type: 'Лекция',
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
      isDone: false,
      human: 'Женя'
    }];

  constructor() { }

  ngOnInit(): void {
    this.groupData();
  }

  groupData(): void {
    this.groupedData = [];
    this.activities = sortDataByTimeASC(this.activities);
    // this.filterTableData();
    of(...this.activities).pipe(
      startWith(null),
      pairwise(),
    ).subscribe(([prevPair, pair]) => {
        if (!prevPair) {
          this.groupedData.push(new GroupByData(pair.startTime.toLocaleDateString(), true));
          this.groupedData.push(pair);
        } else {
          if (prevPair.startTime.toLocaleDateString() === pair.startTime.toLocaleDateString()) {
            this.groupedData.push(pair);
          } else {
            this.groupedData.push(new GroupByData(pair.startTime.toLocaleDateString(), true));
            this.groupedData.push(pair);
          }
        }
      }
    ).unsubscribe();
  }

  getAdditionalInfo(index): string {
    return getAdditionalInfo(index, this.groupedData);
  }

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

}

export function sortDataByTimeASC(tableData: any): any[] {
  return (tableData.sort((a, b) => {
    return (a.startTime.getTime() - b.startTime.getTime());
  }));
}
