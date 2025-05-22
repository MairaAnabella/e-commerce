import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface CartItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  image: string;
  cantidad: number;
}
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartItemsCount = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  cartCount$ = this.cartItemsCount.asObservable();


  /* Agregar producto si no existe pero si ya existe le sumamos uno a la cantidad */
addItem(product: CartItem) {
  if (!product || typeof product.id === 'undefined') {
    console.error('Producto inválido:', product);
    return;
  }

  const cantidad = Number(product.cantidad);
  const cantidadValida = isNaN(cantidad) || cantidad < 1 ? 1 : cantidad;

  const existingIndex = this.cartItems.findIndex(i => i.id === product.id);

  if (existingIndex > -1) {
    this.cartItems[existingIndex].cantidad += cantidadValida;
  } else {
  
    this.cartItems.push({ ...product, cantidad: cantidadValida });
  }

  this.updateCart();
}


  /* eliminar el item completo */
  removeItem(product: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== product.id);
    this.updateCart();
  }

  /* elimina completo el carrito */
  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  /* agrega un item especifico */
  increaseQuantity(item: CartItem) {
    const product = this.cartItems.find(i => i.id === item.id);
    if (product) {
      product.cantidad++;
      this.updateCart();
    }
  }
/* elimina un item  */
  decreaseQuantity(item: CartItem) {
    const product = this.cartItems.find(i => i.id === item.id);
    if (product && product.cantidad > 1) {
      product.cantidad--;
    } else {
      this.removeItem(item);
    }
    this.updateCart();
  }

  /* calcula el total del carrito hasta ese momento  */
  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }


  private updateCart() {
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartItemsCount.next(this.cartItems.length);
  }
}

