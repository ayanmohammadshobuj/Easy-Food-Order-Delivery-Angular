import {Routes} from '@angular/router';
import {NotfounderrorComponent} from "./notfounderror/notfounderror.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./customer/home/home.component";
import {authGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard], data: {role: 'ADMIN'}},
  {path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  {path: 'restaurant', loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule), canActivate: [authGuard], data: {role: 'RESTAURANT'}},
  {path: 'rider', loadChildren: () => import('./rider/rider.module').then(m => m.RiderModule), canActivate: [authGuard], data: {role: 'RIDER'}},
  {path: 'user', loadChildren: () => import('./auth/registration.module').then(m => m.RegistrationModule),},
  {path: '',
    redirectTo: '/customer',
    pathMatch: 'full'
  },
  {path: '404notfound' ,
    component: NotfounderrorComponent
  },
  {path: '**', redirectTo: '/404notfound'},
];
