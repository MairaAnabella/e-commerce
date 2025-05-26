import { Routes } from '@angular/router';
import { SelectUserLoginComponent } from './features/Auth/components/select-user-login/select-user-login.component'; 
import { DashboardComponent } from './features/Home/components/dashboard/dashboard.component'; 
import { PageCartComponent } from './features/Cart/components/page-cart/page-cart.component'; 
import { PageReportsComponent } from './features/Reports/components/page-reports/page-reports.component';
import { MyPurchasesComponent } from './features/shopping/my-purchases/my-purchases.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { NoFoundComponent } from './shared/no-found/no-found.component';
export const routes: Routes = [
    {path:'',component:SelectUserLoginComponent,canActivate: [NoAuthGuard] },
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
    {path:'cart',component:PageCartComponent,canActivate:[AuthGuard]},
    {path:'report',component:PageReportsComponent,canActivate:[AuthGuard]},
    {path:'MyPurchases',component:MyPurchasesComponent,canActivate:[AuthGuard]},
    { path: '**', component:NoFoundComponent },
   
];
