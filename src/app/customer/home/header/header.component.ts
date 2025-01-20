import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { NgIf } from '@angular/common';
import { ProfileImageService } from '../../service/profile-image.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = 'User';
  userEmail: string = '';
  userRole: string = '';
  userId: string = '';
  isHomePage: boolean = false;
  profileImage: string = 'assets/admin_assets/profile_image.jpg'; // Default image

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileImageService: ProfileImageService,
    private http: HttpClient
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticatedCustomer();
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/customer/home/';
    });

    if (this.isLoggedIn) {
      this.fetchUserProfileImage();
    }
  }

  fetchUserProfileImage(): void {
    this.profileImageService.getProfileImage().subscribe(
      response => {
        if (response.displayPicture){
          this.profileImage = `data:image/jpeg;base64,${response.displayPicture}`;
        }else {
          this.profileImage = 'assets/admin_assets/profile_image.jpg';
        }
      },
      error => {
        console.error('Error fetching profile image', error);
      }
    );
  }

  updateProfileImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const updateMethod = this.profileImage === 'assets/admin_assets/profile_image.jpg'
        ? this.profileImageService.createProfileImage(file)
        : this.profileImageService.updateProfileImage(file);

      updateMethod.subscribe(
        () => {
          this.fetchUserProfileImage();
        },
        error => {
          console.error('Error updating profile image', error);
        }
      );
    }
  }

  goToCart(): void {
    const url = 'http://localhost:8000/open/restaurants/food';
    this.http.get<any>(url).subscribe(
      response => {
        const restaurantId = response.id;
        this.router.navigate([`/customer/restaurants/${restaurantId}`]);
      },
      error => {
        console.error('Error fetching restaurant ID', error);
        this.router.navigate(['/customer/restaurants']);
      }
    );
  }
}
