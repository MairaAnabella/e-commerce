import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Product {
  id: number,
  nombre: string,
  precio: number,
  image: string,
  descripcion: string
}


@Component({
  selector: 'app-products',
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  visibleProductsCount = 4;
  products: Product[] = [
    {
      id: 1,
      nombre: 'Producto Demo',
      precio: 29.99,
      image: 'assets/profileUser.jpg',
      descripcion: 'Una breve descripción del producto.'
    },
    {
      id: 2,
      nombre: 'Producto Demo 2',
      precio: 50.99,
      image: 'assets/profileUser.jpg',
      descripcion: 'Una breve descripción del producto 2.'
    },
    {
      id: 3,
      nombre: 'Producto Demo',
      precio: 29.99,
      image: 'assets/profileUser.jpg',
      descripcion: 'Una breve descripción del producto.'
    },
    {
      id: 4,
      nombre: 'Producto Demo 2',
      precio: 50.99,
      image: 'assets/profileUser.jpg',
      descripcion: 'Una breve descripción del producto 2.'
    },
    {
      id: 5,
      nombre: 'Producto Demo',
      precio: 29.99,
      image: 'assets/profileUser.jpg',
      descripcion: 'Una breve descripción del producto.'
    },
    {
      id: 6,
      nombre: 'Producto Demo 2',
      precio: 50.99,
      image: 'assets/profileUser.jpg',
      descripcion: 'Una breve descripción del producto 2.'
    }

  ]
    ;

  constructor(private cartService: CartService) { }


  get visibleProducts() {
    return this.products.slice(0, this.visibleProductsCount);
  }

  showMore() {
    this.visibleProductsCount += 4; // o cualquier cantidad que quieras mostrar de más
  }

  addToCart(product: any) {
    console.log('clcik')
    this.cartService.addItem(product);
  }
}
