import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.saveToken(response.jwt);
        const role = response.role;

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'CUSTOMER') {
          this.router.navigate(['/']);
        } else if (role === 'RESTAURANT') {
          this.authService.hasRestaurant().subscribe(
            (restaurant) => {
              if (restaurant && restaurant.id) {
                this.router.navigate(['/restaurant']);
              } else {
                this.router.navigate(['/restaurant/create']);
              }
            },
            (error) => {
              this.router.navigate(['/restaurant/create']);
            }
          );
        } else if (role === 'RIDER') {
          this.router.navigate(['/rider']);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
