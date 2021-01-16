import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Product, ShoppingList} from '../models/shopping.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private readonly http: HttpClient, private authService: AuthService) { }

  getShoppingLists(): Observable<any> {
    return this.http.get(this.authService.getUrl() + '/shopping_list', { headers: this.authService.getHeaders()});
  }

  addShoppingList(shoppingListName: string): Observable<any> {
    console.log('auth');
    return this.http.post(this.authService.getUrl() + '/shopping_list', {name: shoppingListName},
      { headers: this.authService.getHeaders()});
  }

  deleteShoppingList(shoppingListId: number): Observable<any> {
    return this.http.delete(this.authService.getUrl() + `/shopping_list/${shoppingListId}`,
      { headers: this.authService.getHeaders()});
  }

  updateShoppingList(shoppingList: ShoppingList): Observable<any> {
    return this.http.put(this.authService.getUrl() + `/shopping_list/${shoppingList.id}`, {name: shoppingList.name},
      { headers: this.authService.getHeaders()});
  }

  addProduct(addedProduct: Product): Observable<any> {
    addedProduct.deadline.toISOString();
    return this.http.post(this.authService.getUrl() + '/products', addedProduct,
      { headers: this.authService.getHeaders()});
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(this.authService.getUrl() + `/products/${productId}`,
      { headers: this.authService.getHeaders()});
  }

  updateProduct(product: Product): Observable<any> {
    product.deadline.toISOString();
    const updatedProduct = JSON.parse(JSON.stringify(product));
    updatedProduct.approved = updatedProduct.approved ? 'подтвержден' : 'не подтвержден';
    return this.http.put(this.authService.getUrl() + `/products/${updatedProduct.id}`, updatedProduct,
      { headers: this.authService.getHeaders()});
  }

}
