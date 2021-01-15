import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

 periodMap = new Map<string, number>();
  constructor() {
    this.periodMap.set('Каждый день', 86400);
    this.periodMap.set('Каждые два дня', 86400 * 2);
    this.periodMap.set('Каждые три дня', 86400 * 3);
    this.periodMap.set('Каждые четыре дня', 86400 * 4);
    this.periodMap.set('Каждые пять дней', 86400 * 5);
    this.periodMap.set('Каждые шесть дней', 86400 * 6);
    this.periodMap.set('Каждую неделю', 86400 * 7);
    this.periodMap.set('Каждые две недели', 86400 * 14);
    this.periodMap.set('Без повтора', 0);
  }
}

export type Period = 'Каждый день' | 'Каждые два дня' | 'Каждые три дня' | 'Каждые четыре дня' |
  'Каждые пять дней' | 'Каждые шесть дней' | 'Каждую неделю' | 'Каждые две недели' | 'Без повтора';
