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

}

}
