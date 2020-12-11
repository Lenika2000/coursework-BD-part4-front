import {Component, Inject, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../../../../models/shopping.model';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent implements OnInit {

  @Output() productUpdate = new EventEmitter<Product>();
  minDate = new Date();
  updateForm: FormGroup;


  constructor( private dialogRef: MatDialogRef<UpdateProductDialogComponent>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public product: Product) {
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: [this.product.name, {validators: [Validators.required]}],
      price: [this.product.price, {validators: [Validators.required,
          Validators.pattern('^-?(0|[1-9]\\d*)([.,]\\d+)?'), Validators.min(1)]}],
      quantity: [this.product.quantity, {validators: [Validators.required,
          Validators.pattern('^-?[0-9]+$'), Validators.min(1)] }],
      urgency: [ this.product.urgency ],
      isConfirm: [this.product.isConfirm],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onProductUpdate(): void {
    this.closeDialog();
    this.productUpdate.emit(this.updateForm.value);
  }

}
