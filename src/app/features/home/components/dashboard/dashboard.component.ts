import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { ProductsComponent } from "../products/products.component";
import { ResumeCartComponent } from "../cart/resume-cart/resume-cart.component";


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    HeaderComponent,
    ProductsComponent,
    ResumeCartComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
