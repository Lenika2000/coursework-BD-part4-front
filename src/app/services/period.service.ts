import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

 static periodMap = new Map<string, number>();
 static periodMapFromServer = new Map<number, string>();
  constructor() {
    PeriodService.periodMap.set('Каждый день', 86400);
    PeriodService.periodMap.set('Каждые два дня', 86400 * 2);
    PeriodService.periodMap.set('Каждые три дня', 86400 * 3);
    PeriodService.periodMap.set('Каждые четыре дня', 86400 * 4);
    PeriodService.periodMap.set('Каждые пять дней', 86400 * 5);
    PeriodService.periodMap.set('Каждые шесть дней', 86400 * 6);
    PeriodService.periodMap.set('Каждую неделю', 86400 * 7);
    PeriodService.periodMap.set('Каждые две недели', 86400 * 14);
    PeriodService.periodMap.set('Без повтора', undefined);
    PeriodService.periodMapFromServer.set(86400, 'Каждый день');
    PeriodService.periodMapFromServer.set(86400 * 2, 'Каждые два дня');
    PeriodService.periodMapFromServer.set(86400 * 3, 'Каждые три дня');
    PeriodService.periodMapFromServer.set(86400 * 4, 'Каждые четыре дня');
    PeriodService.periodMapFromServer.set(86400 * 5, 'Каждые пять дней');
    PeriodService.periodMapFromServer.set(86400 * 6, 'Каждые шесть дней');
    PeriodService.periodMapFromServer.set(86400 * 7, 'Каждую неделю');
    PeriodService.periodMapFromServer.set(86400 * 14, 'Каждые две недели');
  }

  static getPeriodMap(): Map<string, number> {
    return PeriodService.periodMap;
  }

  static getPeriodMapFromServer(): Map<number, string> {
    return PeriodService.periodMapFromServer;
  }
}

export type Period = 'Каждый день' | 'Каждые два дня' | 'Каждые три дня' | 'Каждые четыре дня' |
  'Каждые пять дней' | 'Каждые шесть дней' | 'Каждую неделю' | 'Каждые две недели' | 'Без повтора';
