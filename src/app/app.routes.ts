import { Routes } from '@angular/router';
import { SelectUserLoginComponent } from './features/auth/components/select-user-login/select-user-login.component';
import { DashboardComponent } from './features/home/components/products/dashboard/dashboard.component';


export const routes: Routes = [
    {path:'',component:SelectUserLoginComponent},
    {path:'dashboard',component:DashboardComponent}
];
