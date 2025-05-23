import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/header/header.component";
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { CartService } from '../../Cart/services/cart.service';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { Router } from '@angular/router';

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
  readonly panelOpenState = signal(false);
  isLinear = true;
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
}
