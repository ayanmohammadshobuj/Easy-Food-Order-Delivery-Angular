import { Products } from "./products";

export interface Carts {
    cartId: number;
    userId: number;
    products: { productId: number; quantity: number; thumbnail : string}[]; // Array of product objects
    total: number;

  }
