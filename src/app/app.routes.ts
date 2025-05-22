import { Routes } from '@angular/router';
import { SelectUserLoginComponent } from './features/auth/components/select-user-login/select-user-login.component';
import { DashboardComponent } from './features/home/components/dashboard/dashboard.component';
import { PageCartComponent } from './features/home/components/cart/page-cart/page-cart.component';

export const routes: Routes = [
    {path:'',component:SelectUserLoginComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'cart',component:PageCartComponent},
   
];
