export interface ShoppingList {
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
