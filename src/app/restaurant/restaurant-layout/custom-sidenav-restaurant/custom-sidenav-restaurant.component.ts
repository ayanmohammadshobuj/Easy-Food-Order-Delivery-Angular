import { Component, OnInit, Input, signal, computed } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from "@angular/material/list";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { RestaurantLayoutComponent } from "../restaurant-layout.component";
import { ImageService } from './image.service';
import { AuthService } from "../../../auth/auth.service";
import {UserService} from "../../../admin/serivces/user.service";

export type RestaurantMenuItem = {
  icon: string;
  label: string;
  route: string;
  subMenu?: RestaurantMenuItem[]; // Add optional subMenu property
}

@Component({
  selector: 'app-custom-sidenav-restaurant',
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
  templateUrl: './custom-sidenav-restaurant.component.html',
  styleUrl: './custom-sidenav-restaurant.component.css'
})
export class CustomSidenavRestaurantComponent implements OnInit {

  sideNavCollapsed = signal(false);
  expandedMenuItems = signal<Map<string, boolean>>(new Map()); // Track expanded state for each menu item

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  menuItems = signal<RestaurantMenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/restaurant/dashboard' },
    { icon: 'shopping_basket', label: 'Orders', route: '/restaurant/orders' },
    {
      icon: 'shopping_cart',
      label: 'Items Management',
      route: '/restaurant/items',
      subMenu: [
        { icon: 'list', label: 'Item List', route: '/restaurant/items' },
        { icon: 'add', label: 'Add Item', route: '/restaurant/item/create' },
        { icon: 'edit', label: 'Edit Item', route: '/restaurant/items/edit' }
      ]
    },
    {
      icon: 'people',
      label: 'Profile Management',
      route: '/restaurant/profile',
      subMenu: [
        { icon: 'person', label: 'View Profile', route: '/restaurant/profile' },
        { icon: 'edit', label: 'Edit Profile', route: '/restaurant/owner/update' },
        { icon: 'edit', label: 'Edit Restaurant', route: '/restaurant/edit' },
        { icon: 'add', label: '', route: '/restaurant' },
      ]
    },
    { icon: 'attach_money', label: 'Finance', route: '/restaurant/finance' }
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? 32 : '80');
  imageData: string | null = null; // Variable to hold the image data
  userName = signal<string>('');
  userRole = signal<string>('');

  constructor(private adminLayout: RestaurantLayoutComponent, private imageService: ImageService, private authService: AuthService, private userService: UserService) { }

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
