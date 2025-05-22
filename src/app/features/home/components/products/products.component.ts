import { Component } from '@angular/core';

import { CartService } from '../../../../services/cart-service.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
 product = {
    name: 'Producto Demo',
    price: 29.99,
    image: 'assets/profileUser.jpg',
    description: 'Una breve descripción del producto.'
  };

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    console.log('clcik')
    this.cartService.addToCart(product);
  }
}
