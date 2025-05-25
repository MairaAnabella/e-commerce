import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/header/header.component';

import { ProductsComponent } from '../../../Products/components/products/products.component';
import { ResumeCartComponent } from '../../../Cart/components/resume-cart/resume-cart.component'; 
import { UserService } from '../../../../core/user.service';

@Component({
  selector: 'app-dashboard',
   standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ProductsComponent,
    ResumeCartComponent,
    
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
constructor(private userService: UserService) {}

ngOnInit() {
  this.userService.getUsers().subscribe(data => console.log('user ',  data));
/*   this.userService.getCarritoProducto().subscribe(data => console.log('relacion producto/ carrito',data));
  this.userService.getCompras().subscribe(data => console.log('compras ',data));
  this.userService.getListaCarrito().subscribe(data => console.log('carritos ',data));
 
  this.userService.getProductoCarrito(1).subscribe(data => console.log('productos dentro del carrito ',data));
  this.userService.getfechaEspecial().subscribe(data => console.log('fechas especiales ',data)); */
}

}
