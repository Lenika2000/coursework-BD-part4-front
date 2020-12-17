import {Component, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormatType, LessonType} from '../../../../../models/activity.model';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.css']
})
export class AddActivityDialogComponent implements OnInit {

  addForm: FormGroup;
  @Output() logbookRowAdd = new EventEmitter<any>();
  public activities = [ 'учебное_занятие' , 'рабочая_смена', 'спортивное_занятие' ,
    'поход_в_магазин' , 'встреча' , 'другое' ];
  public activitiesFormat: FormatType[] = [ 'очный' , 'дистанционный'];
  public lessonsType: LessonType[] = [ 'лекция' , 'практика'];
  minDate = new Date();
  isLesson = false;
  // isWork = false;
  isSport = false;
  // isShopping = false;
  // isMeting = false;
  isOther = false;

  constructor( public confirmDialogRef: MatDialogRef<AddActivityDialogComponent>,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.minDate.setHours(12, 23);
    this.addForm = this.formBuilder.group({
      startTime: [],
      endTime: [],
      interval: [],
      periodicity: [],
      format: [],
      impactOnStressLevel: [],
      location: [],
      isDone: [],
      activityType: [],
      room: [],
      teacher: [],
      lessonType: [],
      sportType: [],
      description: [],
    });
    this.onChangeActivityType();
  }

  closeDialog(): void {
    this.confirmDialogRef.close();
  }

  cleanVariables(): void {
    this.isLesson = false;
    this.isOther = false;
    this.isSport = false;
  }

  onChangeActivityType(): void {
    this.addForm.get('activityType').valueChanges.subscribe(selectedActivityType => {
      this.cleanVariables();
      switch (selectedActivityType) {
          case 'учебное_занятие': {
            this.isLesson = true;
            break;
          }
          case 'спортивное_занятие' : {
            this.isSport = true;
            break;
          }
          case 'другое' : {
            this.isOther = true;
            break;
          }
        }
    });
  }


}
