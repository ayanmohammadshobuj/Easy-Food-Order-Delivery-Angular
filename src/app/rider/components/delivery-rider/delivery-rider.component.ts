import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-delivery-rider',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './delivery-rider.component.html',
  styleUrl: './delivery-rider.component.css'
})
export class DeliveryRiderComponent implements OnInit {
  deliveries: any[] = [];
  processingDeliveries: any[] = [];
  completedDeliveries: any[] = [];
  activeTab: string = 'processing';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDeliveries();
  }

  fetchDeliveries(): void {
    this.loading = true;
    this.http.get('http://localhost:8000/api/delivery/rider').subscribe({
      next: (data: any) => {
        this.deliveries = data;
        this.filterDeliveries();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  filterDeliveries(): void {
    this.processingDeliveries = this.deliveries.filter((delivery) =>
      ['ACCEPTED', 'PICKED_UP'].includes(delivery.status)
    );
    this.completedDeliveries = this.deliveries.filter((delivery) => delivery.status === 'DELIVERED');
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  updateToPickedUp(deliveryId: number): void {
    this.http.put(`http://localhost:8000/api/delivery/picked-up/${deliveryId}`, {}).subscribe({
      next: () => {
        alert('Delivery status updated to PICKED_UP!');
        this.fetchDeliveries();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update status.');
      },
    });
  }

  updateToDelivered(deliveryId: number, otp: number): void {
    this.http.put(`http://localhost:8000/api/delivery/delivered/${deliveryId}/${otp}`, {}).subscribe({
      next: () => {
        alert('Delivery status updated to DELIVERED!');
        this.fetchDeliveries();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update status. Ensure OTP is correct.');
      },
    });
  }
}
