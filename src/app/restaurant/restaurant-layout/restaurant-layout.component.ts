import {Component, computed, HostListener, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CustomSidenavRestaurantComponent} from "./custom-sidenav-restaurant/custom-sidenav-restaurant.component";

@Component({
  selector: 'app-restaurant-layout',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    NgIf,
    RouterLink,
    RouterOutlet,
    CustomSidenavRestaurantComponent
  ],
  templateUrl: './restaurant-layout.component.html',
  styleUrl: './restaurant-layout.component.css'
})
export class RestaurantLayoutComponent {
  collapsed = signal(false);

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.collapsed.set((event.target as Window).innerWidth < 768);
  }
  sidenavWidth = computed(() => this.collapsed() ? '92px' : '250px');

  darkMode = signal(false);

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedDarkMode = localStorage.getItem('darkMode');
      if (storedDarkMode !== null) {
        this.darkMode.set(JSON.parse(storedDarkMode));
      }
    }
  }

  doChecked() {
    const isDarkMode = this.isDarkMode();
    this.darkMode.set(!isDarkMode);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    }
  }

  isDarkMode = computed(() => this.darkMode());

  backgroundColor = computed(() => this.darkMode() ? '#333' : '#c7c7c7');
  textColor = computed(() => this.darkMode() ? '#fff' : '#333');
  iconColor = computed(() => this.darkMode() ? '#fff' : '#333');
  containersBackgroundColor = computed(() => this.darkMode() ? '#444' : '#ffffff');
  blackAndWhite = computed(() => this.darkMode() ? '#111' : '#fff');
  ballBackground = computed(() => this.darkMode() ? '#fff' : '#111');
}
