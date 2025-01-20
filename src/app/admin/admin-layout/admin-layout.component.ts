import { Component, computed, HostListener, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { MaterialModule } from "../../material.module";
import { CustomSidenavComponent } from "./custom-sidenav/custom-sidenav.component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    CustomSidenavComponent,
    RouterLink,
    NgIf,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

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
}
