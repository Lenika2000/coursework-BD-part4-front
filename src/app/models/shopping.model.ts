export interface ShoppingList {
  id?: number;
  name: string;
  products?: Product[];
}


export interface Product {
  id?: number;
  name: string;
  price: number;
  amount: number;
  deadline: Date;
  approved?: any;
  shopping_list_id?: number;
}
