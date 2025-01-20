import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {authGuard} from "../auth/auth.guard";
import {AddProductComponent} from "./components/add-product/add-product.component";
import {ShowProductComponent} from "./components/show-product/show-product.component";
import {ShowUserComponent} from "./components/show-user/show-user.component";
import {ShowRestaurantComponent} from "./components/show-restaurant/show-restaurant.component";
import {AddRestaurantComponent} from "./components/add-restaurant/add-restaurant.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {SettingsComponent} from "./components/settings/settings.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product/create', component: AddProductComponent },
      { path: 'products', component: ShowProductComponent },
      { path: 'users', component: ShowUserComponent },
      { path: 'user/create', component: AddUserComponent },
      { path: 'restaurants', component: ShowRestaurantComponent },
      { path: 'restaurants/create', component: AddRestaurantComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
