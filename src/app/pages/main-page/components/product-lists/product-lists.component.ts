import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ShoppingList} from '../../../../models/shopping.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from './delete-proguct-dialog/delete-product-dialog.component';
import {AddUpdateProductDialogComponent} from './add-update-product-dialog/add-update-product-dialog.component';
import {MatTable} from '@angular/material/table';
import {AddShopListComponent} from './add-shop-list/add-shop-list.component';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth-page/auth-page.component';

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
  isListNameUpdating = false;
  updateShopNameForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  @ViewChild('table', {static: false}) table: MatTable<Product>;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
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
    this.updateShopNameForm = this.formBuilder.group({
      name:  new FormControl('', [Validators.required, this.validateShopName.bind(this)]),
    });
    this.updateShopNameForm.get('name').setValue(this.selectedShoppingList.name);
  }

  generateShopNamesList(): void {
    this.shopNamesList = [];
    this.shoppingLists.map((shop: ShoppingList) => {
      this.shopNamesList.push(shop.name);
    });
  }

  openAddUpdateDialog(isAddOperation: boolean, product: Product): MatDialogRef<AddUpdateProductDialogComponent, any>  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '450px';
    dialogConfig.width = '376px';
    dialogConfig.data = {
      product,
      isAddOperation
    };
    if (!isAddOperation) {
      this.selectedProduct = product;
    }
    return this.dialog.open(AddUpdateProductDialogComponent, dialogConfig);
  }

  updateProduct(product: Product): void {
    const dialogConfirmConfigRef = this.openAddUpdateDialog(false, product);
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


  addProduct(): void {
    const product = {
      name: 'Карусель',
      price: 100,
      quantity: 1,
      urgency: new Date(),
      isConfirm: false
    };
    const dialogConfirmConfigRef = this.openAddUpdateDialog(true, product);
    dialogConfirmConfigRef.componentInstance.productAdd.subscribe((addedProduct: Product) => {
      console.log(addedProduct);
      this.selectedShoppingList.products.push(addedProduct);
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

  deleteSelectedShopList(): void {
    this.shoppingLists = this.shoppingLists.filter((shoppingList: ShoppingList) => {
      return !(shoppingList.name === this.selectedShoppingList.name);
    });
    this.selectedShoppingList = this.shoppingLists[0];
    this.updateShopNameForm.get('name').setValue(this.selectedShoppingList.name);
    this.generateShopNamesList();
  }

  cleanSelectedShopList(): void {
    this.selectedShoppingList.products = [];
  }

  changeShopName(newShopListName: string): void {
    this.selectedShoppingList = this.shoppingLists.filter((shoppingList: ShoppingList) => {
      return shoppingList.name === newShopListName;
    })[0];
    this.updateShopNameForm.get('name').setValue(this.selectedShoppingList.name);
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

  showListNameInput(): void {
    this.isListNameUpdating = true;
  }

  updateListName(): void {
    this.selectedShoppingList.name = this.updateShopNameForm.get('name').value;
    this.generateShopNamesList();
    this.isListNameUpdating = false;
  }

  validateShopName(c: FormControl): ValidationErrors {
    const isValid = this.shopNamesList.filter((name: string) => {
      if (name !== this.selectedShoppingList.name) {
        return name === c.value.trim();
      } else {
        return false;
      }
    }).length === 0;
    return isValid ? null : {
      validateShopName: {
        valid: false
      }
    };
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
