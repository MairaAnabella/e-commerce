import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { CartItem } from '../../../../shared/interfaces/cart-item';
import { Router } from '@angular/router';





@Component({
  selector: 'app-resume-cart',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule

  ],
  templateUrl: './resume-cart.component.html',
  styleUrl: './resume-cart.component.scss'
})
export class ResumeCartComponent {
  cartItems: CartItem[] = [];
  cartCount: number = 0;
  descuentoCalculado = {
    descuentoobtenido: 0,
    montoPagado: 0,

  };
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.descuentoCalculado = this.cartService.calcularDescuento();
  }


  getTotal(): number {
    return this.cartService.getTotal();
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item);
  }


  clearCart() {
    this.cartService.clearCart();
  }
  removeItem(item: any) {
    this.cartService.removeItem(item);
  }
  goToCarrito() {
    this.router.navigate(['/cart'])
  }
}
