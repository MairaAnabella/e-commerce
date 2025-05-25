import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CartService } from '../../features/Cart/services/cart.service'; 
import {MatBadgeModule} from '@angular/material/badge';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';
@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   cartCount: number = 0;
 user:any;

  constructor(private cartService: CartService, private router:Router , private userService:UserService) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
      console.log(this.cartCount)
    });
   this.user =this.userService.getUsuario();
  
   
  }
  goToCard(){
    this.router.navigate(['/cart'])
  }
    goToProducts(){
    this.router.navigate(['/dashboard'])
  }

  goToReport(){
    this.router.navigate(['/report'])
  }
   goToShopping(){
    this.router.navigate(['/MyPurchases'])
  }
   exit(){
    this.userService.limpiarUsuario();
    this.router.navigate(['/MyPurchases'])
  }
}
