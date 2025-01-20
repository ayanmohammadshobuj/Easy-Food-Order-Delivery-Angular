import {Component, computed} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AdminLayoutComponent} from "../../admin-layout/admin-layout.component";
import {MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatListModule, ReactiveFormsModule, MatDialogContent, MatFormField, MatInput, MatLabel, MatDialogActions, MatButton, MatDialogClose, MatCardContent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private adminLayout: AdminLayoutComponent) { }
  ngOnInit(): void {
    this.adminLayout.darkMode();
  }
  backgroundColor = computed(() => this.adminLayout.darkMode() ? '#333' : '#c7c7c7');
  textColor = computed(() => this.adminLayout.darkMode() ? '#fff' : '#333');
  iconColor = computed(() => this.adminLayout.darkMode() ? '#fff' : '#333');
  containersBackgroundColor = computed(() => this.adminLayout.darkMode() ? '#444' : '#ffffff');
}
