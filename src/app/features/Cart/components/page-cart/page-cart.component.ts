import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/header/header.component'; 
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CartItem } from '../../../../shared/interfaces/cart-item'; 
import { CartService } from '../../services/cart.service'; 
import { MatIconModule } from '@angular/material/icon';
import { Router} from '@angular/router';
@Component({
  selector: 'app-page-cart',
  imports: [
    CommonModule,
    HeaderComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  
  ],
  templateUrl: './page-cart.component.html',
  styleUrl: './page-cart.component.scss'
})
export class PageCartComponent {
  cartItems:CartItem[]=[];
  cartCount: number = 0;
constructor(private cartService: CartService , private router:Router) { }
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log('Carrito actualizado:', this.cartItems);
    });
   this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
      console.log(this.cartCount)
    });
    
  }
    getTotal(): number {
    return this.cartService.getTotal();
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
   this.cartService.decreaseQuantity(item);
  }

   clearCart() {
    this.cartService.clearCart();
  }
  removeItem(item:any){
    this.cartService.removeItem(item);
  }
  goToProducts(){
    this.router.navigate(['/dashboard'])
  }
}
