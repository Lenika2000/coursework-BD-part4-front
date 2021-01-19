import {ShoppingList} from './shopping.model';

export interface Activity {
  id?: number;
  start_time: Date;
  end_time: Date;
  processing_date?: Date; // дата ближайшего выполнения
  duration: string; // продолжительность
  period: string; // разница в днях между выполнениями активности
  format: FormatType;
  stress_points: number;
  location: Location;
  activity_type: ActivityType;
  completed?: boolean;
  description?: string;
  room?: string;
  teacher?: string;
  type?: string;
  shoppingList?: ShoppingList;
}

export interface ServerActivity {
  id?: number;
  description?: string;
  type?: string;
  room?: string;
  teacher?: string;
  shopping_list_id?: number;
  start_time: Date;
  end_time: Date;
  processing_date?: Date; // дата ближайшего выполнения
  duration: number; // продолжительность
  period: number; // разница в днях между выполнениями активности
  format: FormatType;
  stress_points: number;
  activity_type: string;
  completed?: string;
  location_id: number;
}

export interface Location {
  id?: number;
  name: string;
  user_id?: number;
}

export type LessonType = 'лекция' | 'практика';
export type FormatType = 'очный' | 'дистанционный';
export type ActivityType = 'Учеба' | 'Работа' | 'Спорт' |
  'Поход в магазин' | 'Встреча' | 'Перемещение' | 'Другое' | 'Все' ;

export class GroupByData {
  constructor(private date: string, private  isGroupBy: boolean) {
  }
}


