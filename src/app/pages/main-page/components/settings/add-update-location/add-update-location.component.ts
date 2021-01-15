import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../auth-page/auth-page.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Location} from '../../../../../models/activity.model';

@Component({
  selector: 'app-add-update-location',
  templateUrl: './add-update-location.component.html',
  styleUrls: ['./add-update-location.component.css']
})
export class AddUpdateLocationComponent implements OnInit {

  @Output() locationUpdate = new EventEmitter<Location>();
  @Output() locationAdd = new EventEmitter<Location>();
  locationForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor( private dialogRef: MatDialogRef<AddUpdateLocationComponent>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: LocationWithOperationType) {
  }

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      name: [this.data.location.name, {validators: [Validators.required]}]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onLocationUpdate(): void {
    this.closeDialog();
    this.data.location.name = this.locationForm.get('name').value;
    this.locationUpdate.emit(this.data.location);
  }

  onLocationAdd(): void {
    this.closeDialog();
    this.locationAdd.emit(this.locationForm.value);
  }
}

export interface LocationWithOperationType {
  location: Location;
  isAddOperation: boolean;
}
