import { Component, OnInit, Input, signal, computed } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from "@angular/material/list";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../../auth/auth.service";
import { UserService } from "../../../admin/serivces/user.service";
import { ImageService } from "./image.service";
import { RestaurantMenuItem } from "../../../restaurant/restaurant-layout/custom-sidenav-restaurant/custom-sidenav-restaurant.component";
import { RiderLayoutComponent } from "../rider-layout.component";

export type RiderMenuItem = {
  icon: string;
  label: string;
  route: string;
  subMenu?: RiderMenuItem[];
}

@Component({
  selector: 'app-custom-sidenav-rider',
  standalone: true,
  imports: [
    MatIcon,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatNavList,
    NgForOf,
    NgIf,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './custom-sidenav-rider.component.html',
  styleUrl: './custom-sidenav-rider.component.css'
})
export class CustomSidenavRiderComponent implements OnInit {

  sideNavCollapsed = signal(false);
  expandedMenuItems = signal<Map<string, boolean>>(new Map()); // Track expanded state for each menu item

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  menuItems = signal<RiderMenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/rider/dashboard' },
    { icon: 'shopping_basket', label: 'Orders', route: '/rider/orders' },
    { icon: 'delivery_dining', label: 'Deliveries', route: '/rider/deliveries' },
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? 32 : '80');
  imageData: string | null = null; // Variable to hold the image data
  userName = signal<string>('');
  userRole = signal<string>('');

  constructor(private adminLayout: RiderLayoutComponent, private imageService: ImageService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.adminLayout.darkMode();
    this.loadImage();
    this.userService.getUserDetails().subscribe(user => {
      this.userName.set(user.fullName);
      this.userRole.set(user.role);
    });
  }

  loadImage(): void {
    this.imageService.getImage().subscribe(response => {
      if (response.displayPicture != null) {
        this.imageData = `data:image/jpeg;base64,${response.displayPicture}`;
      } else {
        this.imageData = "assets/images/default-profile.png";
      }

    });
  }

  backgroundColor = computed(() => this.adminLayout.darkMode() ? '#333' : '#c7c7c7');
  textColor = computed(() => this.adminLayout.darkMode() ? '#fff' : '#333');
  iconColor = computed(() => this.adminLayout.darkMode() ? '#fff' : '#333');
  containersBackgroundColor = computed(() => this.adminLayout.darkMode() ? '#444' : '#ffffff');

  toggleSubMenu(label: string) {
    const expanded = this.expandedMenuItems();
    expanded.set(label, !expanded.get(label));
    this.expandedMenuItems.set(new Map(expanded));
  }

  isSubMenuExpanded(label: string): boolean {
    return this.expandedMenuItems().get(label) || false;
  }

  logout() {
    this.authService.logout();
  }
}
