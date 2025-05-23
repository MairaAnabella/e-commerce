import { Routes } from '@angular/router';
import { SelectUserLoginComponent } from './features/Auth/components/select-user-login/select-user-login.component'; 
import { DashboardComponent } from './features/Home/components/dashboard/dashboard.component'; 
import { PageCartComponent } from './features/Cart/components/page-cart/page-cart.component'; 
import { PageReportsComponent } from './features/Reports/components/page-reports/page-reports.component';
import { MyPurchasesComponent } from './features/shopping/my-purchases/my-purchases.component';
export const routes: Routes = [
    {path:'',component:SelectUserLoginComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'cart',component:PageCartComponent},
    {path:'report',component:PageReportsComponent},
    {path:'MyPurchases',component:MyPurchasesComponent},
   
];
