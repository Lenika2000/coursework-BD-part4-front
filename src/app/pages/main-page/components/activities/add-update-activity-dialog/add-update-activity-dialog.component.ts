import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivityType, FormatType, LessonType, Period} from '../../../../../models/activity.model';
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
  public periodList: Period[]  = ['Без повтора', 'Каждый день', 'Каждую неделю', 'Каждый месяц', 'Каждый год'];
  public activitiesFormat: FormatType[] = [ 'Очный' , 'Дистанционный'];
  public lessonsType: LessonType[] = [ 'Лекция' , 'Практика'];
  // todo запрашивать с сервера
  public shoppingListNames: string[] = [];
  minProcessingDate = new Date();
  maxDate = new Date();
  minDate = new Date();
  isPeriodicityActivity = false;
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
      start_time: [ this.data.activity.start_time, {validators: [Validators.required]}],
      end_time: [this.data.isAddOperation ? '' : this.data.activity.end_time],
      start_timepicker: [ this.data.activity.start_time.getHours() + ':' + this.data.activity.start_time.getMinutes(), {validators: [Validators.required]}],
      end_timepicker: [ this.data.activity.end_time.getHours() + ':' + this.data.activity.end_time.getMinutes(), {validators: [Validators.required]}],
      processing_date: [this.data.activity.processing_date , {validators: [Validators.required]}],
      duration: [this.data.activity.duration, {validators: [Validators.required]}],
      period: [this.data.activity.period],
      format: [this.data.activity.format],
      stress_points: [this.data.activity.stress_points, {validators: [Validators.required, Validators.pattern('^(-|\\+)?(0|[1-9]\\d*)')]}],
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
    }, { validator: ValidateStartTimepicker});
    this.updateMinMaxDate();
    this.setPeriodType(this.addUpdateForm.get('period').value);
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

  setPeriodType(selectedPeriodicity: string): void {
    if (selectedPeriodicity.localeCompare('Без повтора') === 0) {
      this.addUpdateForm.controls.processing_date.enable();
      this.isPeriodicityActivity = false;
    } else {
      this.addUpdateForm.controls.processing_date.disable();
      this.isPeriodicityActivity = true;
    }
  }

  onChangeActivityType(): void {
    this.addUpdateForm.get('activityType').valueChanges.subscribe(selectedActivityType => {
      this.cleanVariables();
      this.setActivityTypeSettings(selectedActivityType);
    });
    this.addUpdateForm.get('period').valueChanges.subscribe(selectedPeriodicity => {
      this.setPeriodType(selectedPeriodicity);
    });
  }

  // собираем из даты и времени новую дату
  getCorrectDate(time: string, mainDate: Date ): Date {
    const correctDate = new Date();
    const hours = time.substr(0, time.indexOf(':'));
    const min = time.substr(time.indexOf(':') + 1, time.length - 1);
    correctDate.setFullYear(mainDate.getFullYear(),
      mainDate.getMonth(), mainDate.getDate());
    correctDate.setHours(Number(hours), Number(min));
    return correctDate;
  }

  addAction(): void {
    const startTimepicker = this.addUpdateForm.get('start_timepicker').value;
    const endTimepicker = this.addUpdateForm.get('end_timepicker').value;
    if (!this.isPeriodicityActivity) {
      // непериодическая активность
      const processingDate = this.addUpdateForm.get('processing_date').value;
      this.addUpdateForm.get('start_time').setValue(this.getCorrectDate(startTimepicker, processingDate));
      this.addUpdateForm.get('end_time').setValue(this.getCorrectDate(endTimepicker, processingDate));
    } else  {
      // периодическая активность
      if (this.data.isAddOperation) {
        // processing_date при добавлении активности совпадает с допустимой датой начала
        this.addUpdateForm.controls.processing_date.enable();
        this.addUpdateForm.get('processing_date').setValue(this.addUpdateForm.get('start_time').value);
      }
      this.addUpdateForm.get('start_time').setValue(this.getCorrectDate(startTimepicker, this.addUpdateForm.get('start_time').value));
      if (!this.addUpdateForm.get('end_time').value) {
        this.addUpdateForm.get('end_time').setValue(this.getCorrectDate(endTimepicker, new Date(2080, 1, 1)));
      } else {
        this.addUpdateForm.get('end_time').setValue(this.getCorrectDate(endTimepicker, this.addUpdateForm.get('end_time').value));
      }
    }
    console.log(this.addUpdateForm.value);
    this.activityAdd.emit(this.addUpdateForm.value);
    this.closeDialog();
  }

  updateAction(): void {
    this.activityUpdate.emit(this.addUpdateForm.value);
    this.closeDialog();
  }

  updateMinMaxDate(): void {
    this.maxDate = this.addUpdateForm.get('end_time').value;
    this.minDate = this.addUpdateForm.get('start_time').value;
  }
}

export interface ActivityWithOperationType {
  activity: any;
  isAddOperation: boolean;
}

const ValidateStartTimepicker: ValidatorFn = (fg: FormGroup) => {
  const endTimepicker = fg.get('end_timepicker').value;
  const startTimepicker = fg.get('start_timepicker').value;
  const startHours = addZeros(startTimepicker.substr(0, startTimepicker.indexOf(':')), 2);
  const startMin = addZeros(startTimepicker.substr(startTimepicker.indexOf(':') + 1, startTimepicker.length - 1), 2);
  const endHours = addZeros(endTimepicker.substr(0, endTimepicker.indexOf(':')), 2);
  const endMin = addZeros(endTimepicker.substr(endTimepicker.indexOf(':') + 1, endTimepicker.length - 1), 2);
  const isValid = startHours.concat(startMin).localeCompare(endHours.concat(endMin)) === -1;
  return isValid ? null : {
    validateStartTimepicker: {
      valid: false
    }
  };
};

export function addZeros(str: string, numbersQuantity: number) {
  str = str.toString();
  return str.length < numbersQuantity ? addZeros('0' + str, numbersQuantity) : str;
}
