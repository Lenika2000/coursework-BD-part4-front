export interface ShoppingList {
  id?: number;
  name: string;
  products: Product[];
}


export interface Product {
  name: string;
  price: number;
  quantity: number;
  urgency: Date;
  isConfirm: boolean;
}
