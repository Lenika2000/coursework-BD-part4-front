import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

 periodMap = new Map<string, number>();
 periodMapFromServer = new Map<number, string>();
  constructor() {
    this.periodMap.set('Каждый день', 86400);
    this.periodMap.set('Каждые два дня', 86400 * 2);
    this.periodMap.set('Каждые три дня', 86400 * 3);
    this.periodMap.set('Каждые четыре дня', 86400 * 4);
    this.periodMap.set('Каждые пять дней', 86400 * 5);
    this.periodMap.set('Каждые шесть дней', 86400 * 6);
    this.periodMap.set('Каждую неделю', 86400 * 7);
    this.periodMap.set('Каждые две недели', 86400 * 14);
    this.periodMap.set('Без повтора', undefined);
    this.periodMapFromServer.set(86400, 'Каждый день');
    this.periodMapFromServer.set(86400 * 2, 'Каждые два дня');
    this.periodMapFromServer.set(86400 * 3, 'Каждые три дня');
    this.periodMapFromServer.set(86400 * 4, 'Каждые четыре дня');
    this.periodMapFromServer.set(86400 * 5, 'Каждые пять дней');
    this.periodMapFromServer.set(86400 * 6, 'Каждые шесть дней');
    this.periodMapFromServer.set(86400 * 7, 'Каждую неделю');
    this.periodMapFromServer.set(86400 * 14, 'Каждые две недели');
  }

  getPeriodMap(): Map<string, number> {
    return this.periodMap;
  }

  getPeriodMapFromServer(): Map<number, string> {
    return this.periodMapFromServer;
  }
}

export type Period = 'Каждый день' | 'Каждые два дня' | 'Каждые три дня' | 'Каждые четыре дня' |
  'Каждые пять дней' | 'Каждые шесть дней' | 'Каждую неделю' | 'Каждые две недели' | 'Без повтора';
