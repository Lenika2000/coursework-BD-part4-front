import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MyErrorStateMatcher} from '../../../../auth-page/auth-page.component';
import {ShoppingList} from '../../../../../models/shopping.model';

@Component({
  selector: 'app-add-shop-list',
  templateUrl: './add-shop-list.component.html',
  styleUrls: ['./add-shop-list.component.css']
})
export class AddShopListComponent implements OnInit {

  @Output() shopNameCreate = new EventEmitter<string>();
  addShopNameForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor( private dialogRef: MatDialogRef<AddShopListComponent>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public shopLists: ShoppingList[]) {
  }

  ngOnInit(): void {
    this.addShopNameForm = this.formBuilder.group({
      name:  new FormControl('', [Validators.required, this.validateShopName.bind(this), Validators.maxLength(32)]),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onShopNameCreate(): void {
    this.closeDialog();
    this.shopNameCreate.emit(this.addShopNameForm.value.name);
  }

  validateShopName(c: FormControl): ValidationErrors {
    const isValid = this.shopLists.filter((shopList: ShoppingList) => {
      return shopList.name === c.value.trim();
    }).length === 0;
    return isValid ? null : {
      validateShopName: {
        valid: false
      }
    };
  }
}


