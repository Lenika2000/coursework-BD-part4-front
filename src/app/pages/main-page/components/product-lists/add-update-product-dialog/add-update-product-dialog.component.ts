import {Component, Inject, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../../../../models/shopping.model';
import {MyErrorStateMatcher} from '../../../../auth-page/auth-page.component';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './add-update-product-dialog.component.html',
  styleUrls: ['./add-update-product-dialog.component.css']
})
export class AddUpdateProductDialogComponent implements OnInit {

  @Output() productUpdate = new EventEmitter<Product>();
  @Output() productAdd = new EventEmitter<Product>();
  minDate = new Date();
  productForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor( private dialogRef: MatDialogRef<AddUpdateProductDialogComponent>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: ProductWithOperationType) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [this.data.isAddOperation ? '' : this.data.product.name, {validators: [Validators.required]}],
      price: [this.data.isAddOperation ? '' : this.data.product.price, {validators: [Validators.required,
          Validators.pattern('^-?(0|[1-9]\\d*)([.,]\\d+)?'), Validators.min(1)]}],
      amount: [this.data.isAddOperation ? '' : this.data.product.amount, {validators: [Validators.required,
          Validators.pattern('^-?[0-9]+$'), Validators.min(1)] }],
      deadline: [this.data.isAddOperation ? new Date() : this.data.product.deadline],
      approved: [{value: this.data.isAddOperation ? '' : this.data.product.approved, disabled: this.data.isAddOperation}],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onProductUpdate(): void {
    this.closeDialog();
    this.productUpdate.emit(this.productForm.value);
  }

  onProductAdd(): void {
    this.closeDialog();
    this.productAdd.emit(this.productForm.value);
  }

}

export interface ProductWithOperationType {
  product: Product;
  isAddOperation: boolean;
}
