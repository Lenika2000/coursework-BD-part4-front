import { Component, OnInit } from '@angular/core';
import {Product, ShoppingList} from '../../../../models/shopping.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from './delete-proguct-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.css']
})
export class ProductListsComponent implements OnInit {

  public displayedColumns = ['name', 'price', 'quantity', 'urgency', 'isConfirm',
    'update', 'delete'];
  selectedShoppingList: ShoppingList;
  shoppingList: ShoppingList[];
  constructor(private dialog: MatDialog) { }

  public lentaProducts: Product[] = [
    {
      name: 'Молоко',
      price: 45,
      quantity: 2,
      urgency: new Date(),
      isConfirm: false
    },
    {
      name: 'Печенье',
      price: 45,
      quantity: 2,
      urgency: new Date(),
      isConfirm: false
    }];

  public magnitProducts: Product[] = [
    {
      name: 'Молоко',
      price: 45,
      quantity: 2,
      urgency: new Date(),
      isConfirm: false
    },
    {
      name: 'Печенье',
      price: 45,
      quantity: 2,
      urgency: new Date(),
      isConfirm: false
    }];

  ngOnInit(): void {
    this.shoppingList = [
      {
        name: 'Магнит',
        products: this.magnitProducts
      },
      {
        name: 'Лента',
        products: this.lentaProducts
      }
    ];
    this.selectedShoppingList = this.shoppingList[0];
  }

  openUpdateDialog(product: Product): void {

  }


  openDeleteDialog(product: Product): void {
    const confirmDialogConfig = new MatDialogConfig();
    confirmDialogConfig.height = '170px';
    confirmDialogConfig.width = '280px';
    confirmDialogConfig.data = product;

    const dialogConfirmConfigRef = this.dialog.open(DeleteProductDialogComponent, confirmDialogConfig);

    dialogConfirmConfigRef.componentInstance.productDelete.subscribe(() => {
      // const deletedElemIndex = this.tableData.findIndex((d) => d === selectedRow);
      // this.changeHours(this.selectedElem.startTime, deletedElemIndex + 1, -2);
      // this.tableData.splice(deletedElemIndex, 1);
      // this.saveLoading = true;
      // this.groupData();
      // this.table.renderRows();
      // this.deleteRow.emit(this.selectedElem);
    });
  }

}
