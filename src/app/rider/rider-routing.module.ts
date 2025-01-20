import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RiderLayoutComponent} from "./rider-layout/rider-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {OrdersRiderComponent} from "./components/orders-rider/orders-rider.component";
import {DeliveryRiderComponent} from "./components/delivery-rider/delivery-rider.component";

const routes: Routes = [
  {
    path: '',
    component: RiderLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersRiderComponent },
      { path: 'deliveries', component: DeliveryRiderComponent },
      {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderRoutingModule {
}
