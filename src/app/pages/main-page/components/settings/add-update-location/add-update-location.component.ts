import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../auth-page/auth-page.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Location} from '../../../../../models/activity.model';
import {DadataConfig, DadataAddress, DadataSuggestion, DadataType} from '@kolkov/ngx-dadata';

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
  config: DadataConfig = {
    apiKey: 'f0013e110e1ca9f82c9c4db398b0f6baf2ff665a',
    type: DadataType.address
  };

  constructor( private dialogRef: MatDialogRef<AddUpdateLocationComponent>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: LocationWithOperationType) {
  }

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      name: [this.data.location.name, {validators: [Validators.required]}],
      address: [this.data.location.address, {validators: [Validators.required]}]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onLocationUpdate(): void {
    this.closeDialog();
    this.locationUpdate.emit(this.locationForm.value);
  }

  onLocationAdd(): void {
    this.closeDialog();
    this.locationAdd.emit(this.locationForm.value);
  }

  onAddressSelected(event: DadataSuggestion): void {
    const addressData = event.data as DadataAddress;
  }

}

export interface LocationWithOperationType {
  location: Location;
  isAddOperation: boolean;
}
