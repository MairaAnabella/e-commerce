import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../../shared/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-page-cart',
  imports: [
    CommonModule,
    HeaderComponent,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './page-cart.component.html',
  styleUrl: './page-cart.component.scss'
})
export class PageCartComponent {
 cartItems = [
    {
      nombre: 'Hamburguesa Clásica',
      precio: 12.99,
      precioConDescuento: 11.04,
      descuento: 15,
      cantidad: 1,
    },
    {
      nombre: 'Pizza Margherita',
      precio: 14.99,
      cantidad: 1,
    },
  ];
}
