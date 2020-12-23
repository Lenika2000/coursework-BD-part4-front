import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../../../../models/shopping.model';
import {Activity} from '../../../../../models/activity.model';

@Component({
  selector: 'app-delete-activity-dialog',
  templateUrl: './delete-activity-dialog.component.html',
  styleUrls: ['./delete-activity-dialog.component.css']
})
export class DeleteActivityDialogComponent implements OnInit {

  @Output() activityDelete = new EventEmitter();

  constructor(
    public confirmDialogRef: MatDialogRef<DeleteActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public activity: Activity) {
  }

  closeDialog(): void {
    this.confirmDialogRef.close();
  }

  onActivityDelete(): void {
    this.closeDialog();
    this.activityDelete.emit();
  }

  ngOnInit(): void {
  }

}
