import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/header/header.component";
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../Cart/services/cart.service';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  pivot: {
    carrito_id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: string;
  };
}

export interface Carrito {
  id: number;
  usuario_id: number;
  tipo: string;
  fecha_finalizacion: string;
  fecha_simulada: string;
  estado: string;
  productos: Producto[];
}

export interface Compra {
  id: number;
  carrito_id: number;
  usuario_id: number;
  fecha_compra: string;
  monto_pagado: string;
  monto_bruto: string;
  descuento_total: string;
  carrito: Carrito;
}





@Component({
  selector: 'app-my-purchases',
  imports: [
    HeaderComponent,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './my-purchases.component.html',
  styleUrl: './my-purchases.component.scss'
})
export class MyPurchasesComponent {
  compras: Compra[] = [];

  readonly panelOpenState = signal(false);
  isLinear = true;
  cartItems: CartItem[] = [];
  cartCount: number = 0;
  constructor(private cartService: CartService, private router: Router,private http: HttpClient) { }
  ngOnInit(): void {
    const datosUsuarioStr = localStorage.getItem('datosUsuario');
  const datosUsuario = datosUsuarioStr ? JSON.parse(datosUsuarioStr) : null;

  if (!datosUsuario || !datosUsuario.id) {
    console.error('No se pudo obtener el ID del usuario');
    return;
  }

  const usuarioId = datosUsuario.id;

this.http.get<Compra[]>(`http://localhost:8000/api/compras/finalizadas/${usuarioId}`)
  .subscribe({
    next: (response) => {
      this.compras = response;
      console.log(this.compras);
    },
    error: (error) => {
      console.error('Error al obtener compras:', error);
    }
  });







  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
}
