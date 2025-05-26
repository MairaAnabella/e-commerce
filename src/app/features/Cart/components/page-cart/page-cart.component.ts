import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CartItem } from '../../../../shared/interfaces/cart-item';
import { CartService } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-page-cart',
  imports: [
    CommonModule,
    HeaderComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.scss']
})
export class PageCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartCount: number = 0;
  datosUsuario: any;
  fechaSeleccionada: any;
  tipoCarrito: string = '';
  descuentoCalculado = {
    descuentoobtenido: 0,
    montoPagado: 0,
  };

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.descuentoCalculado = this.cartService.calcularDescuento(); 
    });

    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    
    });

    const datosUsuarioStr = localStorage.getItem('datosUsuario');
    const fechaSeleccionadaStr = localStorage.getItem('fechaSeleccionada');

    this.datosUsuario = datosUsuarioStr ? JSON.parse(datosUsuarioStr) : null;
    this.fechaSeleccionada = fechaSeleccionadaStr ? JSON.parse(fechaSeleccionadaStr) : null;

    this.tipoCarrito = this.determinarTipoCarrito();
  }

  determinarTipoCarrito(): 'VIP' | 'PROMO_FECHA' | 'NORMAL' {
    if (this.datosUsuario?.isVip) return 'VIP';
    if (this.fechaSeleccionada?.descripcion) return 'PROMO_FECHA';
    return 'NORMAL';
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  increaseQuantity(item: CartItem) {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.decreaseQuantity(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  goToProducts() {
    this.router.navigate(['/dashboard']);
  }

  cancelarCarrito() {
    this.cartService.clearCart();
    this.router.navigate(['/dashboard']);
  }

  finalizarCompra() {
   
    this.cartService.finalizarCompra().subscribe({
      next: () => {
        
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Error al finalizar compra:', error);
      }
    });
  
  }
}
