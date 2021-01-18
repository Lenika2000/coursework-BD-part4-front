import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stress, StressPointsService} from '../../../../services/stress-points.service';
import {ScheduleService} from '../../../../services/schedule.service';
import {PeriodService} from '../../../../services/period.service';
import {FinanceService} from '../../../../services/finance.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() activeScreen: AppScreen = 'activities';
  @Output() activeScreenChanged: EventEmitter<AppScreen> = new EventEmitter<AppScreen>();
  balance = 0;
  currentStressLevel = 0;
  login;

  constructor(private  stressPointsService: StressPointsService,
              private scheduleService: ScheduleService,
              private financeService: FinanceService,
              private periodService: PeriodService) {}

  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('part4.currentUser'));
    this.scheduleService.updateStressLvlSubject.subscribe(() => {
      this.getStressPoints();
    });
    this.getStressPoints();
    this.getBalance();
  }

  getStressPoints(): void {
    this.stressPointsService.getStressPoint().subscribe((stress: Stress) => {
      this.currentStressLevel = stress.current_stress;
    });
  }

  getBalance(): void {
    this.financeService.getBalance().subscribe((answer) => {
      this.balance = answer.balance;
    });
  }

  setActiveAction(action: AppScreen): void {
    this.activeScreen = action;
    this.activeScreenChanged.emit(this.activeScreen);
  }

}

export type AppScreen = 'schedule' | 'activities' | 'finance' | 'product-lists' | 'settings';
