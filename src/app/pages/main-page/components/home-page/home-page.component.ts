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

  public displayedColumns = ['start_time', 'duration', 'format', 'activity_type', 'stress_points',
    'location', 'isConfirm'];
  @ViewChild('table', {static: false}) table: MatTable<Product>;
  groupedData: Array<any> = new Array<any>();

  public activities: any = [
    {
      start_time: new Date(),
      end_time: new Date(),
      period: 'каждый вторник',
      duration: '1:10',
      format: 'очный',
      stress_points: 50,
      location: 'Ломо',
      activity_type: 'Учеба',
      isDone: false,
      room: 223,
      teacher: 'Клименков',
      type: 'лекция',
    },
    {
      start_time: new Date(),
      end_time: new Date(),
      period: 'каждый понедельник',
      duration: '1:10',
      format: 'Дистанционный',
      stress_points: 50,
      location: 'Ломо',
      activity_type: 'Встреча',
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
          this.groupedData.push(new GroupByData(pair.start_time.toLocaleDateString(), true));
          this.groupedData.push(pair);
        } else {
          if (prevPair.start_time.toLocaleDateString() === pair.start_time.toLocaleDateString()) {
            this.groupedData.push(pair);
          } else {
            this.groupedData.push(new GroupByData(pair.start_time.toLocaleDateString(), true));
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
    return (a.start_time.getTime() - b.start_time.getTime());
  }));
}
