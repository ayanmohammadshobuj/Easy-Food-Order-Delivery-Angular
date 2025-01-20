import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './order-confirmation-dialog.component.html',
  styleUrl: './order-confirmation-dialog.component.css'
})
export class OrderConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: Router
  ) {}

  onConfirm(): void {
    this.dialogRef.close('confirm');
    this.route.navigate(['customer/orders']);
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}
