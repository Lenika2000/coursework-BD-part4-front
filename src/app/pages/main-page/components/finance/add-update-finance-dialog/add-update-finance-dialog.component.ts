import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../auth-page/auth-page.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FinanceElem, FinanceElemType} from '../../../../../models/finance.model';

@Component({
  selector: 'app-add-update-finance-dialog',
  templateUrl: './add-update-finance-dialog.component.html',
  styleUrls: ['./add-update-finance-dialog.component.css']
})
export class AddUpdateFinanceDialogComponent implements OnInit {

  @Output() elemUpdate = new EventEmitter<FinanceElem>();
  @Output() elemAdd = new EventEmitter<FinanceElem>();
  financeForm: FormGroup;
  financeElemTypes: FinanceElemType[] = ['Доход', 'Расход'];
  matcher = new MyErrorStateMatcher();

  constructor( private dialogRef: MatDialogRef<AddUpdateFinanceDialogComponent>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: FinanceElemWithOperationType) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.financeForm = this.formBuilder.group({
      type: [this.data.financeElem.type, {validators: [Validators.required]}],
      sum: [this.data.financeElem.sum, {validators: [Validators.required,
          Validators.pattern('^-?(0|[1-9]\\d*)([.,]\\d+)?'), Validators.min(1)]}],
      description: [this.data.financeElem.description, {validators: [Validators.required]}],
      date: [ this.data.financeElem.date ],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onElemUpdate(): void {
    this.closeDialog();
    this.elemUpdate.emit(this.financeForm.value);
  }

  onElemAdd(): void {
    this.closeDialog();
    this.elemAdd.emit(this.financeForm.value);
  }

}

export interface FinanceElemWithOperationType {
  financeElem: FinanceElem;
  isAddOperation: boolean;
}
