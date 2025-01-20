import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerLayoutComponent} from "./customer-layout/customer-layout.component";
import {HomeComponent} from "./home/home.component";
import {authGuard} from "../auth/auth.guard";
import {CartComponent} from "./pages/cart/cart.component";
import {MenuComponent} from "./pages/menu/menu.component";
import {RestaurantsComponent} from "./components/restaurants/restaurants.component";
import {SingleRestaurantComponent} from "./components/restaurants/single-restaurant/single-restaurant.component";
import {
  AddToCartModalComponent
} from "./components/restaurants/single-restaurant/add-to-cart-modal/add-to-cart-modal.component";
import {OrderComponent} from "./components/order/order.component";
import {OrderListComponent} from "./components/order-list/order-list.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileSettingsComponent} from "./components/profile-settings/profile-settings.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent, canActivate: [authGuard], data: { role: 'CUSTOMER' } },
      { path: 'menu', component: MenuComponent, canActivate: [authGuard], data: { role: 'CUSTOMER' } },
      { path: 'restaurants', component: RestaurantsComponent },
      { path: 'restaurants/:id', component: SingleRestaurantComponent },
      { path: 'cart/add', component: AddToCartModalComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'checkout', component: OrderComponent },
      { path: 'orders', component: OrderListComponent},
      { path: 'favorites', component: FavoritesComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'profile/settings', component: ProfileSettingsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
