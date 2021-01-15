export interface Activity {
  activityId?: number;
  start_time: Date;
  end_time: Date;
  processing_date?: Date; // дата ближайшего выполнения
  duration: string; // продолжительность
  period: string; // разница в днях между выполнениями активности
  format: FormatType;
  stress_points: number;
  location: Location;
  activityType: ActivityType;
  isDone: boolean;
}

export interface Lesson extends Activity{
  room: string;
  teacher: string;
  lessonType: LessonType;
}

export interface Sport extends Activity{
  sportType: string;
}

export interface Other extends Activity{
  description: string;
}

// todo
export interface Shopping extends Activity {
  shopListName: string;
  shoppingListID?: number;
}

// todo
export interface Meeting extends Activity{
  human?: string;
}

export interface Location {
  id?: number;
  name: string;
  user_id?: number;
}

export type LessonType = 'Лекция' | 'Практика';
export type FormatType = 'Очный' | 'Дистанционный';
export type ActivityType = 'Учеба' | 'Работа' | 'Спорт' |
  'Поход в магазин' | 'Встреча' | 'Перемещение' | 'Другое' ;

export class GroupByData {
  constructor(private date: string, private  isGroupBy: boolean) {
  }
}


