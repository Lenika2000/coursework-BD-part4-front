import {Component, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityType, FormatType, LessonType, Periodicity} from '../../../../../models/activity.model';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import {MyErrorStateMatcher} from '../../../../auth-page/auth-page.component';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.css']
})
export class AddActivityDialogComponent implements OnInit {

  addForm: FormGroup;
  @Output() logbookRowAdd = new EventEmitter<any>();
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

  constructor( public confirmDialogRef: MatDialogRef<AddActivityDialogComponent>,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.minDate.setHours(12, 23);
    this.addForm = this.formBuilder.group({
      startTime: [ new Date()],
      endTime: [new Date()],
      interval: [new Date(), {validators: [Validators.required]}],
      periodicity: ['Каждый день'],
      format: ['Очный'],
      impactOnStressLevel: ['', {validators: [Validators.required, Validators.pattern('^(-|\\+)?(0|[1-9]\\d*)')]}],
      location: [''],
      isDone: [],
      activityType: ['',  {validators: [Validators.required]}],
      room: ['',  {validators: [Validators.required , Validators.pattern('[^A-Za-z0-9]')]}],
      teacher: ['',  {validators: [Validators.required, Validators.pattern('[^A-Za-z-А-Яа-я ]')]}],
      lessonType: ['Практика'],
      sportType: ['',  {validators: [Validators.required]}],
      description: ['',  {validators: [Validators.required]}],
      humanName: ['',  {validators: [Validators.required]}],
      shoppingListName: [''],
    });
    this.addForm.get('startTime').value.setHours(8, 0, 0);
    this.addForm.get('endTime').value.setHours(15, 0, 0);
    this.locations = JSON.parse(localStorage.getItem('part4.locations'));
    this.onChangeActivityType();
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
  }

  onChangeActivityType(): void {
    this.addForm.get('activityType').valueChanges.subscribe(selectedActivityType => {
      this.cleanVariables();
      switch (selectedActivityType) {
          case 'Учеба': {
            this.isLesson = true;
            break;
          }
          case 'Спорт' : {
            this.isSport = true;
            break;
          }
          case 'Другое' : {
            this.isOther = true;
            break;
          }
          case 'Поход в магазин' : {
            this.isShopping = true;
            break;
          }
          case 'Встреча' : {
            this.isMeeting = true;
            break;
          }
        }
    });
  }


}
