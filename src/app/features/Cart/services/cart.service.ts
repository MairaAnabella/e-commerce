import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { API_CONFIG } from '../../../config/config';


@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartItemsCount = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  cartCount$ = this.cartItemsCount.asObservable();


  private carritoId: number | null = null;

  constructor(private http: HttpClient) { }

  addItem(product: CartItem) {
    const existingIndex = this.cartItems.findIndex(i => i.id === product.id);
    const cantidad = Math.max(1, Number(product.cantidad || 1));

    if (existingIndex > -1) {
      this.cartItems[existingIndex].cantidad += cantidad;
    } else {
      this.cartItems.push({ ...product, cantidad });
    }

    this.updateCart();
    this.syncCarritoWithBackend();
  }

  removeItem(product: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== product.id);
    this.updateCart();

    if (this.cartItems.length === 0 && this.carritoId) {
      this.updateCart();
      this.deleteCarritoBackend(this.carritoId);
    } else {
      this.syncCarritoWithBackend();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
    if (this.carritoId) {
      this.deleteCarritoBackend(this.carritoId);
    }
    this.carritoId = null;
  }

  increaseQuantity(item: CartItem) {
    const found = this.cartItems.find(i => i.id === item.id);
    if (found) {
      found.cantidad++;
      this.updateCart();
      this.syncCarritoWithBackend();

    }
  }


  decreaseQuantity(item: CartItem) {
    const found = this.cartItems.find(i => i.id === item.id);
    if (found) {
      if (found.cantidad > 1) {
        found.cantidad--;
      } else {
        this.removeItem(item);
        return;
      }
      this.updateCart();
      this.syncCarritoWithBackend();
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  private updateCart() {
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartItemsCount.next(this.cartItems.length);
  }

  private syncCarritoWithBackend() {
    const datosUsuarioStr = localStorage.getItem('datosUsuario');
    const fechaSeleccionadaStr = localStorage.getItem('fechaSeleccionada');

    const datosUsuario = datosUsuarioStr ? JSON.parse(datosUsuarioStr) : null;
    const fechaSeleccionada = fechaSeleccionadaStr ? JSON.parse(fechaSeleccionadaStr) : null;
    const fechaSimuladaRaw = fechaSeleccionada?.fecha || new Date();
    const fechaSimulada = new Date(fechaSimuladaRaw)
      .toISOString()
      .replace('T', ' ')
      .substring(0, 19);

    if (!datosUsuario || this.cartItems.length === 0) return;

    const tipo = datosUsuario.isVip ? 'VIP' :
      fechaSeleccionada?.descripcion ? 'PROMO_FECHA' : 'NORMAL';

    const payload = {
      usuario_id: datosUsuario.id,
      tipo,
      fecha_simulada: fechaSimulada,
      productos: this.cartItems.map(item => ({
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio
      }))
    };

    // Si ya existe un carrito, actualiza los productos en lugar de crear uno nuevo
    if (this.carritoId) {
      this.http.put(`${API_CONFIG.apiUrl}carritos/${this.carritoId}`, payload).subscribe({
        next: (res) => {
          console.log('Carrito actualizado con ID:', this.carritoId);
        },
        error: err => console.error('Error actualizando carrito:', err)
      });
    } else {
      // Si no existe un carrito, crea uno nuevo
      this.http.post<{ carrito_id: number }>(`${API_CONFIG.apiUrl}carritos`, payload).subscribe({
        next: (res) => {
          console.log('Carrito sincronizado con ID:', res.carrito_id);
          this.carritoId = res.carrito_id;
        },
        error: err => console.error('Error sincronizando carrito:', err)
      });
    }
  }

  private deleteCarritoBackend(id: number) {
    this.http.delete(`${API_CONFIG.apiUrl}carritos/${id}`).subscribe({
      next: () => {
        console.log('Carrito eliminado correctamente en backend');
        this.carritoId = null; // limpio el id porque ya no existe
      },
      error: err => console.error('Error eliminando carrito en backend:', err)
    });
  }
  calcularDescuento() {
    const datosUsuarioStr = localStorage.getItem('datosUsuario');
    const fechaSeleccionadaStr = localStorage.getItem('fechaSeleccionada');

    const datosUsuario = datosUsuarioStr ? JSON.parse(datosUsuarioStr) : null;
    const fechaSeleccionada = fechaSeleccionadaStr ? JSON.parse(fechaSeleccionadaStr) : null;

    const cantidadTotal = this.cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    const montoBruto = this.cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    let descuento = 0;

    // VIP (exclusivo)
    if (datosUsuario?.isVip && cantidadTotal >= 10) {
      if (this.cartItems.length > 1) {
        const productosOrdenados = [...this.cartItems].sort((a, b) => a.precio - b.precio);
        const productoMasBarato = productosOrdenados[0];
        if (productoMasBarato) {
          descuento += Number(productoMasBarato.precio);
        }
      }
      descuento += 500;
    }

    // NO VIP
    else {

      // Carrito 4 productos
      if (cantidadTotal === 4) {
        descuento += montoBruto * 0.25;
      }

      // Carrito PROMO_ESPECIAL 
      else if (fechaSeleccionada?.tipo === 'PROMO_ESPECIAL' && cantidadTotal >= 10) {
        descuento += 300;
      }

      // Carrito común con 10 productos o mas
      else if (cantidadTotal >= 10) {

        descuento += montoBruto * 0.25;
        descuento += 100;
      }
    }

    descuento = Number(descuento) || 0;
    const montoPagado = Math.max(0, montoBruto - descuento);
    return { descuentoobtenido: descuento, montoPagado: montoPagado };
  }


  finalizarCompra(): Observable<Object | null> {
    const descuento = this.calcularDescuento().descuentoobtenido;
    const montoPagado = this.calcularDescuento().montoPagado;
    const datosUsuarioStr = localStorage.getItem('datosUsuario');


    const datosUsuario = datosUsuarioStr ? JSON.parse(datosUsuarioStr) : null;



    const montoBruto = this.cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);



    const payload = {
      carrito_id: this.carritoId,
      usuario_id: datosUsuario.id,
      fecha_compra: new Date().toISOString().split('T')[0],
      monto_pagado: montoPagado.toFixed(2),
      monto_bruto: montoBruto.toFixed(2),
      descuento_total: descuento.toFixed(2)
    };

    this.cartItems = [];
    return this.http.post(`${API_CONFIG.apiUrl}compras`, payload).pipe(tap(() => this.clearCart()));
  }


  logoutOrChangeUser() {
    this.clearCart();
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('fechaSeleccionada');
  }





}
