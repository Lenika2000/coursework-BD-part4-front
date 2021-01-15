import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

 periodMap = new Map<string, string>();
  constructor() {
    this.periodMap.set('Каждый день', 'INTERVAL 1 DAY');
    this.periodMap.set('Каждые два дня', 'INTERVAL 2 DAY');
    this.periodMap.set('Каждые три дня', 'INTERVAL 3 DAY');
    this.periodMap.set('Каждые четыре дня', 'INTERVAL 4 DAY');
    this.periodMap.set('Каждые пять дней', 'INTERVAL 5 DAY');
    this.periodMap.set('Каждые шесть дней', 'INTERVAL 6 DAY');
    this.periodMap.set('Каждую неделю', 'INTERVAL 7 DAY');
    this.periodMap.set('Каждые две недели', 'INTERVAL 14 DAY');
    this.periodMap.set('Каждый месяц', 'INTERVAL 1 MONTH');
    this.periodMap.set('Каждый год', 'INTERVAL 1 YEAR');
    this.periodMap.set('Без повтора', '');
  }
}

export type Period = 'Каждый день' | 'Каждые два дня' | 'Каждые три дня' | 'Каждые четыре дня' |
  'Каждые пять дней' | 'Каждые шесть дней' | 'Каждую неделю' | 'Каждые две недели' | 'Каждый месяц'
  | 'Каждый год' | 'Без повтора';
