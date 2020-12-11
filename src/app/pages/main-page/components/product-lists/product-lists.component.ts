import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ShoppingList} from '../../../../models/shopping.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from './delete-proguct-dialog/delete-product-dialog.component';
import {UpdateProductDialogComponent} from './update-product-dialog/update-product-dialog.component';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.css']
})
export class ProductListsComponent implements OnInit {

  public displayedColumns = ['name', 'price', 'quantity', 'urgency', 'isConfirm',
    'update', 'delete'];
  public shopNamesList: string[] = [];
  selectedShoppingList: ShoppingList;
  selectedProduct: Product;
  shoppingList: ShoppingList[];
  @ViewChild('table', {static: false}) table: MatTable<Product>;

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
    this.shoppingList.map( (shop: ShoppingList) => {
      this.shopNamesList.push(shop.name);
    });
    this.selectedShoppingList = this.shoppingList[0];
  }

  openUpdateDialog(product: Product): void {
    const updateDialogConfig = new MatDialogConfig();
    updateDialogConfig.height = '450px';
    updateDialogConfig.width = '376px';
    updateDialogConfig.data = product;
    this.selectedProduct = product;

    const dialogConfirmConfigRef = this.dialog.open( UpdateProductDialogComponent, updateDialogConfig);

    dialogConfirmConfigRef.componentInstance.productUpdate.subscribe((updatedProduct: Product) => {
      this.selectedProduct.name = updatedProduct.name;
      this.selectedProduct.price = updatedProduct.price;
      this.selectedProduct.quantity = updatedProduct.quantity;
      this.selectedProduct.urgency = updatedProduct.urgency;
      this.selectedProduct.isConfirm = updatedProduct.isConfirm;
      this.table.renderRows();
      // todo сервер
    });
  }


  openDeleteDialog(product: Product): void {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.height = '170px';
    deleteDialogConfig.width = '280px';
    deleteDialogConfig.data = product;

    const dialogConfirmConfigRef = this.dialog.open(DeleteProductDialogComponent, deleteDialogConfig);

    dialogConfirmConfigRef.componentInstance.productDelete.subscribe(() => {
      const deletedElemIndex = this.selectedShoppingList.products.findIndex((d) => d === product);
      this.selectedShoppingList.products.splice(deletedElemIndex, 1);
      this.table.renderRows();
      // todo сервер
    });
  }

}
