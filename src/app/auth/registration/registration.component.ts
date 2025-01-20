import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RegistrationService} from "../registration.service";
import {RegistrationModel} from "../registration.model";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  user: RegistrationModel = {
    fullName: '',
    email: '',
    password: '',
    role: 'CUSTOMER'
  };
  confirmPassword: string = '';

  constructor(private authService: RegistrationService, private router: Router) {}

  register(): void {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        // Handle successful registration (e.g., redirect to login or home page)
        this.router.navigate(['/user']);
      },
      error => {
        console.error('Registration error', error);
        // Handle registration error

      }
    );
  }

  cancel(): void {
    // Handle the cancel action (e.g., clear the form or navigate away)
    this.router.navigate(['/user']);
  }
}
