import { Component } from '@angular/core';
import { CartService } from '../../../Cart/services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../../shared/interfaces/product';
import { ProductService } from '../../services/product.service';



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
  products: Product[] = [];

  constructor(private cartService: CartService, private productService:ProductService) { }

   ngOnInit() {
    this.productService.getProducto().subscribe(data => this.products = data);
  }

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
