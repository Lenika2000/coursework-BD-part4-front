export interface Activity {
  activityId?: number;
  startTime: Date;
  endTime: Date;
  periodicity: string;
  interval: string;
  format: FormatType;
  impactOnStressLevel: number;
  location: string;
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
export interface Shopping extends Activity{
  shoppingListID?: number;
}

// todo
export interface Meeting extends Activity{
  human?: string;
}

export type LessonType = 'лекция' | 'практика';
export type FormatType = 'очный' | 'дистанционный';
export type ActivityType = 'учеба' | 'работа' | 'спорт' |
  'магазин' | 'встреча' | 'перемещение' | 'другое' ;
