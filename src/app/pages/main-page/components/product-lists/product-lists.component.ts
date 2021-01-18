import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ShoppingList} from '../../../../models/shopping.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from './delete-proguct-dialog/delete-product-dialog.component';
import {AddUpdateProductDialogComponent} from './add-update-product-dialog/add-update-product-dialog.component';
import {MatTable} from '@angular/material/table';
import {AddShopListComponent} from './add-shop-list/add-shop-list.component';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth-page/auth-page.component';
import {ShoppingService} from '../../../../services/shopping.service';
import {skip} from 'rxjs/operators';
import {of} from 'rxjs';
import {FinanceService} from '../../../../services/finance.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.css']
})
export class ProductListsComponent implements OnInit {

  public displayedColumns = ['name', 'price', 'amount', 'deadline', 'approved',
    'update', 'delete'];
  public shopListsWithoutProducts: ShoppingList[] = [];
  selectedShoppingList: ShoppingList;
  selectedProduct: Product;
  shoppingLists: ShoppingList[];
  approvedFilter = false;
  isListNameUpdating = false;
  updateShopNameForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  isFirstLoading = true;

  @ViewChild('table', {static: false}) table: MatTable<Product>;

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private shoppingService: ShoppingService,
              private financeService: FinanceService) {
  }

  ngOnInit(): void {
    this.getShoppingLists();
    this.updateShopNameForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, this.validateShopName.bind(this)]),
    });
  }

  generateShopListsWithoutProducts(): void {
    this.shopListsWithoutProducts = this.shoppingLists.map((shop: ShoppingList) => {
      return {
        id: shop.id,
        name: shop.name
      };
    });
    localStorage.setItem('part4.shopping.lists', JSON.stringify(this.shopListsWithoutProducts));
  }

  setCorrectDate(): void {
    of(...this.shoppingLists).pipe(
      skip(1),
    ).subscribe((shop) => {
      shop.products.forEach((product) => {
        product.deadline = new Date(product.deadline);
        product.approved = (product.approved.localeCompare('подтвержден') === 0);
      });
    }).unsubscribe();
  }

  openAddUpdateDialog(isAddOperation: boolean, product: Product): MatDialogRef<AddUpdateProductDialogComponent, any> {
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
      this.selectedProduct.amount = updatedProduct.amount;
      this.selectedProduct.deadline = updatedProduct.deadline;
      this.selectedProduct.approved = updatedProduct.approved;
      this.selectedProduct.shopping_list_id = this.selectedShoppingList.id;
      this.shoppingService.updateProduct(this.selectedProduct).subscribe(() => {
        this.table.renderRows();
      });
    });
  }

  updateProductApproved(product: Product): void {
    this.selectedProduct = product;
    this.selectedProduct.shopping_list_id = this.selectedShoppingList.id;
    this.shoppingService.updateProduct(this.selectedProduct).subscribe(() => {
      this.financeService.setBalanceSubject.next();
      this.table.renderRows();
    });
  }

  addProduct(): void {
    const dialogConfirmConfigRef = this.openAddUpdateDialog(true, undefined);
    dialogConfirmConfigRef.componentInstance.productAdd.subscribe((addedProduct: Product) => {
      addedProduct.shopping_list_id = this.selectedShoppingList.id;
      this.shoppingService.addProduct(addedProduct).subscribe((productId: number) => {
        addedProduct.id = productId;
        this.selectedShoppingList.products.push(addedProduct);
        this.table.renderRows();
      });
    });
  }

  openDeleteDialog(product: Product): void {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.height = '170px';
    deleteDialogConfig.width = '280px';
    deleteDialogConfig.data = product;

    const dialogConfirmConfigRef = this.dialog.open(DeleteProductDialogComponent, deleteDialogConfig);

    dialogConfirmConfigRef.componentInstance.productDelete.subscribe(() => {
      this.shoppingService.deleteProduct(product.id).subscribe(() => {
        const deletedElemIndex = this.selectedShoppingList.products.findIndex((d) => d === product);
        this.selectedShoppingList.products.splice(deletedElemIndex, 1);
        this.table.renderRows();
      });
    });
  }

  deleteSelectedShopList(): void {
    this.shoppingService.deleteShoppingList(this.selectedShoppingList.id).subscribe(() => {
      this.shoppingLists = this.shoppingLists.filter((shoppingList: ShoppingList) => {
        return !(shoppingList.name === this.selectedShoppingList.name);
      });
      this.selectedShoppingList = this.shoppingLists[0];
      this.updateShopNameForm.get('name').setValue(this.selectedShoppingList.name);
      this.generateShopListsWithoutProducts();
    });
  }

  cleanSelectedShopList(): void {
    this.selectedShoppingList.products = [];
  }

  changeFilterShopName(newShopListName: string): void {
    this.selectedShoppingList = this.shoppingLists.filter((shoppingList: ShoppingList) => {
      return shoppingList.name === newShopListName;
    })[0];
    this.updateShopNameForm.get('name').setValue(this.selectedShoppingList.name);
  }

  filterByConfirmation(approvedFilter: boolean): void {
    this.approvedFilter = approvedFilter;
    if (approvedFilter) {
      this.selectedShoppingList = {
        name: this.selectedShoppingList.name,
        products: this.selectedShoppingList.products.filter((product: Product) => {
          return product.approved === this.approvedFilter;
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
    this.shoppingService.updateShoppingList(this.selectedShoppingList).subscribe(() => {
      this.shoppingService.updateShoppingList(this.selectedShoppingList).subscribe(() => {
        this.selectedShoppingList.name = this.updateShopNameForm.get('name').value;
        this.isListNameUpdating = false;
        this.generateShopListsWithoutProducts();
      });
    });
  }

  validateShopName(c: FormControl): ValidationErrors {
    const isValid = this.shopListsWithoutProducts.filter((shop: ShoppingList) => {
      if (shop.name !== this.selectedShoppingList.name) {
        return shop.name === c.value.trim();
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

  getShoppingLists(): void {
    this.shoppingService.getShoppingLists().subscribe((shoppingLists: ShoppingList[]) => {
      console.log(shoppingLists);
      // this.shoppingLists.forEach((shop) => {
      shoppingLists[0].products.forEach((product) => {
        product.deadline = new Date(product.deadline);
        product.approved = (product.approved.localeCompare('подтвержден') === 0);
      });
      // console.log(shoppingLists);
      this.shoppingLists = shoppingLists;
      this.generateShopListsWithoutProducts();
      if (this.isFirstLoading) {
        this.selectedShoppingList = this.shoppingLists[0];
        this.updateShopNameForm.get('name').setValue(this.selectedShoppingList.name);
      } else {
        this.isFirstLoading = false;
      }
      this.setCorrectDate();
    });
  }

  addShopList(): void {
    const addShopListDialogConfig = new MatDialogConfig();
    addShopListDialogConfig.height = '200px';
    addShopListDialogConfig.width = '376px';
    addShopListDialogConfig.data = this.shopListsWithoutProducts;

    const dialogConfirmConfigRef = this.dialog.open(AddShopListComponent, addShopListDialogConfig);

    dialogConfirmConfigRef.componentInstance.shopNameCreate.subscribe((newShopListName: string) => {
      this.shoppingService.addShoppingList(newShopListName).subscribe((id: number) => {
        const newShopList: ShoppingList = {
          id,
          name: newShopListName,
          products: []
        };
        this.shoppingLists.push(newShopList);
        const shoppingListWithoutProducts = {
          id,
          name: newShopListName,
        };
        this.shopListsWithoutProducts.push(shoppingListWithoutProducts);
      });
    });
  }
}
