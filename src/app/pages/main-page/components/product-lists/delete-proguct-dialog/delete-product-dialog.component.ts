import {Component, Inject, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../../../../models/shopping.model';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  @Output() productDelete = new EventEmitter();

  constructor(
    public confirmDialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product) {
  }

  closeDialog(): void {
    this.confirmDialogRef.close();
  }

  onProductDelete(): void {
    this.closeDialog();
    this.productDelete.emit();
  }

  ngOnInit(): void {
  }


}
