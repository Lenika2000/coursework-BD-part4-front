import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ShoppingList} from '../../../../models/shopping.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from './delete-proguct-dialog/delete-product-dialog.component';
import {UpdateProductDialogComponent} from './update-product-dialog/update-product-dialog.component';
import {MatTable} from '@angular/material/table';
import {AddShopListComponent} from './add-shop-list/add-shop-list.component';

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
  shoppingLists: ShoppingList[];
  isConfirmFilter = false;
  @ViewChild('table', {static: false}) table: MatTable<Product>;

  constructor(private dialog: MatDialog) {
  }

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
    this.shoppingLists = [
      {
        name: 'Магнит',
        products: this.magnitProducts
      },
      {
        name: 'Лента',
        products: this.lentaProducts
      }
    ];
    this.generateShopNamesList();
    this.selectedShoppingList = this.shoppingLists[0];
  }

  generateShopNamesList(): void {
    this.shoppingLists.map((shop: ShoppingList) => {
      this.shopNamesList.push(shop.name);
    });
  }

  openUpdateDialog(product: Product): void {
    const updateDialogConfig = new MatDialogConfig();
    updateDialogConfig.height = '450px';
    updateDialogConfig.width = '376px';
    updateDialogConfig.data = product;
    this.selectedProduct = product;

    const dialogConfirmConfigRef = this.dialog.open(UpdateProductDialogComponent, updateDialogConfig);

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

  changeShopName(newShopListName: string): void {
    this.selectedShoppingList = this.shoppingLists.filter((shoppingList: ShoppingList) => {
      return shoppingList.name === newShopListName;
    })[0];
  }

  filterByConfirmation(isConfirmFilter: boolean): void {
    this.isConfirmFilter = isConfirmFilter;
    if (isConfirmFilter) {
      this.selectedShoppingList = {
        name: this.selectedShoppingList.name,
        products: this.selectedShoppingList.products.filter((product: Product) => {
          return product.isConfirm === this.isConfirmFilter;
        })
      };
    } else {
      this.selectedShoppingList = this.shoppingLists.filter((shoppingList: ShoppingList) => {
        return shoppingList.name === this.selectedShoppingList.name;
      })[0];
    }
  }

  addProduct(): void {

  }

  addShopList(): void {
    const addShopListDialogConfig = new MatDialogConfig();
    addShopListDialogConfig.height = '200px';
    addShopListDialogConfig.width = '376px';
    addShopListDialogConfig.data = this.shopNamesList;

    const dialogConfirmConfigRef = this.dialog.open(AddShopListComponent, addShopListDialogConfig);

    dialogConfirmConfigRef.componentInstance.shopNameCreate.subscribe((newShopListName: string) => {
      const newShopList: ShoppingList = {
        name: newShopListName,
        products: []
      };
      this.shoppingLists.push(newShopList);
      this.shopNamesList.push(newShopListName);
      // todo сервер
    });
  }

}
