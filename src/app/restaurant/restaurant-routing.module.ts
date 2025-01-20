import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantLayoutComponent} from "./restaurant-layout/restaurant-layout.component";
import {DashboardRestaurantComponent} from "./components/dashboard-restaurant/dashboard-restaurant.component";
import {ProfileRestaurantComponent} from "./components/profile-restaurant/profile-restaurant.component";
import {FinanceRestaurantComponent} from "./components/finance-restaurant/finance-restaurant.component";
import {ItemsRestaurantComponent} from "./components/items-restaurant/items-restaurant.component";
import {OrdersRestaurantComponent} from "./components/orders-restaurant/orders-restaurant.component";
import {AddItemsRestaurantComponent} from "./components/add-items-restaurant/add-items-restaurant.component";
import {OwnerProfileUpdateComponent} from "./components/owner-profile-update/owner-profile-update.component";
import {RestaurantUpdateComponent} from "./components/restaurant-update/restaurant-update.component";
import {RestaurantInformationsComponent} from "./restaurant-informations/restaurant-informations.component";
import {RestaurantInfoComponent} from "./components/update-components/restaurant-info/restaurant-info.component";
import {
  RestaurantAddressInfoComponent
} from "./components/update-components/restaurant-address-info/restaurant-address-info.component";
import {
  RestaurantContactInfoComponent
} from "./components/update-components/restaurant-contact-info/restaurant-contact-info.component";

const routes: Routes = [
  {
    path: '',
    component: RestaurantLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardRestaurantComponent},
      {path: 'items', component: ItemsRestaurantComponent},
      {path: 'orders', component: OrdersRestaurantComponent},
      {path: 'profile', component: ProfileRestaurantComponent},
      {path: 'finance', component: FinanceRestaurantComponent},
      {path: 'item/create', component: AddItemsRestaurantComponent},
      {path: 'owner/update', component: OwnerProfileUpdateComponent},
      {path: 'update', component: RestaurantUpdateComponent},
      {path: 'edit', component: RestaurantInfoComponent},
      {path: 'edit/address', component: RestaurantAddressInfoComponent},
      {path: 'edit/contact', component: RestaurantContactInfoComponent},
      {
      path: '', redirectTo: 'dashboard', pathMatch: 'full'}]
  },
  {path: 'create', component: RestaurantInformationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
