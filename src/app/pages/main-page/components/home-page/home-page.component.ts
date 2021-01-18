import {Component, OnInit} from '@angular/core';
import {getAdditionalInfo, prepareActivityData} from '../activities/activities.component';
import {Activity, ServerActivity} from '../../../../models/activity.model';
import {ScheduleService} from '../../../../services/schedule.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public displayedColumns = ['interval', 'format', 'activity_type', 'stress_points',
    'location', 'isConfirm'];
  selectedActivity: Activity;
  startDate = new Date();
  minDate = new Date();
  public activities: Activity[] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule(): void {
    this.scheduleService.getSchedule(this.startDate).subscribe( (activities: ServerActivity[]) => {
      this.activities = sortDataByTimeASC(prepareActivityData(activities, true));
    });
  }

  updateActivityApproved(activity: Activity): void {
    this.selectedActivity = activity;
    this.scheduleService.setActivityComplete(activity.id, activity.completed);
  }

  getAdditionalInfo(index): string {
    return getAdditionalInfo(index, this.activities);
  }
}

export function sortDataByTimeASC(tableData: any): any[] {
  return (tableData.sort((a, b) => {
    return (a.start_time.getTime() - b.start_time.getTime());
  }));
}
