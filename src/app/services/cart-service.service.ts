
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: any[] = [];
  private cartItemsCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartItemsCount.asObservable();

  addToCart(product: any) {
    console.log(product)
    this.cartItems.push(product);
    this.cartItemsCount.next(this.cartItems.length);
  }

  getItems() {
    return [...this.cartItems];
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsCount.next(0);
  }
}
