import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityType, FormatType, LessonType, Periodicity} from '../../../../../models/activity.model';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import {MyErrorStateMatcher} from '../../../../auth-page/auth-page.component';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-update-activity-dialog.component.html',
  styleUrls: ['./add-update-activity-dialog.component.css']
})
export class AddUpdateActivityDialogComponent implements OnInit {

  addUpdateForm: FormGroup;
  @Output() activityAdd = new EventEmitter<any>();
  @Output() activityUpdate = new EventEmitter<any>();
  public activities: ActivityType[] = [ 'Учеба' , 'Работа' , 'Спорт' ,
  'Поход в магазин' , 'Встреча' , 'Другое' ];
  public periodicityList: Periodicity[]  = ['Каждый день', 'Каждую неделю', 'Каждый месяц', 'Каждый год', 'Через день', 'Через неделю',
    'Через месяц', 'Через год', 'Без повтора'];
  public activitiesFormat: FormatType[] = [ 'Очный' , 'Дистанционный'];
  public lessonsType: LessonType[] = [ 'Лекция' , 'Практика'];
  // todo запрашивать с сервера
  public shoppingListNames: string[] = [];
  // todo запрашивать с сервера
  public locations: string[] = [];
  minDate = new Date();
  isLesson = false;
  isSport = false;
  isShopping = false;
  isMeeting = false;
  isOther = false;
  theme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#fff',
      buttonColor: '#2a5885'
    },
    dial: {
      dialBackgroundColor: '#2a5885',
    },
    clockFace: {
      clockFaceBackgroundColor: '#2a5885',
      clockHandColor: '#00bfff',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
  matcher = new MyErrorStateMatcher();

  constructor( public confirmDialogRef: MatDialogRef<AddUpdateActivityDialogComponent>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: ActivityWithOperationType) { }

  ngOnInit(): void {
    this.addUpdateForm = this.formBuilder.group({
      startTime: [ this.data.activity.startTime],
      endTime: [this.data.activity.endTime],
      interval: [this.data.activity.interval, {validators: [Validators.required]}],
      periodicity: [this.data.activity.periodicity],
      format: [this.data.activity.format],
      impactOnStressLevel: [this.data.activity.impactOnStressLevel, {validators: [Validators.required, Validators.pattern('^(-|\\+)?(0|[1-9]\\d*)')]}],
      location: [this.data.activity.location , {validators: [Validators.required]}],
      isDone: [],
      activityType: [this.data.activity.activityType,  {validators: [Validators.required]}],
      room: [(this.data.isAddOperation) ? '' : this.data.activity.room,  {validators: [Validators.required]}],
      teacher: [(this.data.isAddOperation) ? '' : this.data.activity.teacher,  {validators: [Validators.required]}],
      lessonType: [(this.data.isAddOperation) ? '' : this.data.activity.type,  {validators: [Validators.required]}],
      sportType: [(this.data.isAddOperation) ? '' : this.data.activity.sportType,  {validators: [Validators.required]}],
      description: [(this.data.isAddOperation) ? '' : this.data.activity.description,  {validators: [Validators.required]}],
      humanName: [(this.data.isAddOperation) ? '' : this.data.activity.humanName,  {validators: [Validators.required]}],
      shoppingListName: [(this.data.isAddOperation) ? '' : this.data.activity.shoppingListName,  {validators: [Validators.required]}],
    });
    this.locations = JSON.parse(localStorage.getItem('part4.locations'));
    this.onChangeActivityType();
    if (!this.data.isAddOperation) {
      this.cleanVariables();
      this.setActivityTypeSettings(this.addUpdateForm.get('activityType').value);
    }
  }

  closeDialog(): void {
    this.confirmDialogRef.close();
  }

  cleanVariables(): void {
    this.isLesson = false;
    this.isOther = false;
    this.isSport = false;
    this.isMeeting = false;
    this.isShopping = false;
    this.addUpdateForm.controls.room.disable();
    this.addUpdateForm.controls.teacher.disable();
    this.addUpdateForm.controls.lessonType.disable();
    this.addUpdateForm.controls.sportType.disable();
    this.addUpdateForm.controls.description.disable();
    this.addUpdateForm.controls.humanName.disable();
    this.addUpdateForm.controls.shoppingListName.disable();
  }

  setActivityTypeSettings(selectedActivityType: string): void {
    switch (selectedActivityType) {
      case 'Учеба': {
        this.isLesson = true;
        this.addUpdateForm.controls.lessonType.enable();
        this.addUpdateForm.controls.room.enable();
        this.addUpdateForm.controls.teacher.enable();
        break;
      }
      case 'Спорт' : {
        this.isSport = true;
        this.addUpdateForm.controls.sportType.enable();
        break;
      }
      case 'Другое' : {
        this.isOther = true;
        this.addUpdateForm.controls.description.enable();
        break;
      }
      case 'Поход в магазин' : {
        this.isShopping = true;
        this.addUpdateForm.controls.shoppingListName.enable();
        break;
      }
      case 'Встреча' : {
        this.isMeeting = true;
        this.addUpdateForm.controls.humanName.enable();
        break;
      }
    }
  }

  onChangeActivityType(): void {
    this.addUpdateForm.get('activityType').valueChanges.subscribe(selectedActivityType => {
      this.cleanVariables();
      this.setActivityTypeSettings(selectedActivityType);
    });
  }

  addAction(): void{
    this.activityAdd.emit(this.addUpdateForm.value);
    this.closeDialog();
  }

  updateAction(): void {
    this.activityUpdate.emit(this.addUpdateForm.value);
    this.closeDialog();
  }

}

export interface ActivityWithOperationType {
  activity: any;
  isAddOperation: boolean;
}
