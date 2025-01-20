import { Component, OnInit, Input, signal, computed } from '@angular/core';
import { MaterialModule } from "../../../material.module";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AdminLayoutComponent } from "../admin-layout.component";
import { ImageService } from './image.service';
import { AuthService } from "../../../auth/auth.service";
import {UserService} from "../../serivces/user.service";

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  subMenu?: MenuItem[];
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatIconModule, MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './custom-sidenav.component.html',
  styleUrls: ['./custom-sidenav.component.css']
})
export class CustomSidenavComponent implements OnInit {
  sideNavCollapsed = signal(false);
  expandedMenuItems = signal<Map<string, boolean>>(new Map());
  userName = signal<string>('');
  userRole = signal<string>('');

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'shopping_basket', label: 'Orders', route: '/admin/orders' },
    {
      icon: 'shopping_cart',
      label: 'Products',
      route: '/admin/products',
      subMenu: [
        { icon: 'list', label: 'Product List', route: '/admin/products' },
        { icon: 'add_shopping_cart', label: 'Add Product', route: '/admin/product/create' },
        { icon: 'edit', label: 'Edit Product', route: '/admin/products/edit' }
      ]
    },
    {
      icon: 'people',
      label: 'Users',
      route: '/admin/users',
      subMenu: [
        { icon: 'list', label: 'User List', route: '/admin/users' },
        { icon: 'add', label: 'Add User', route: '/admin/user/create' },
        { icon: 'edit', label: 'Edit User', route: '/admin/users/edit' }
      ]
    },
    {
      icon: 'restaurant',
      label: 'Restaurants',
      route: '/admin/restaurants',
      subMenu: [
        { icon: 'list', label: 'Restaurant List', route: '/admin/restaurants/list' },
        { icon: 'add', label: 'Add Restaurant', route: '/admin/restaurants/add' },
        { icon: 'edit', label: 'Edit Restaurant', route: '/admin/restaurants/edit' }
      ]
    },
    { icon: 'settings', label: 'Settings', route: '/admin/settings' }
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? 32 : '80');
  imageData: string | null = null;

  constructor(private adminLayout: AdminLayoutComponent, private imageService: ImageService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.adminLayout.darkMode();
    this.imageService.getImage().subscribe(response => {
      this.imageData = `data:image/jpeg;base64,${response.displayPicture}`;
    });
    this.userService.getUserDetails().subscribe(user => {
      this.userName.set(user.fullName);
      this.userRole.set(user.role);
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
