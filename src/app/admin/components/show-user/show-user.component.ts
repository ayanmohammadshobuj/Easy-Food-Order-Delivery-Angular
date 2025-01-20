import {Component, OnInit, AfterViewInit, ViewChild, computed} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserUpdateComponent } from '../user-update/user-update.component';

import {MatIcon} from "@angular/material/icon";
import {MaterialModule} from "../../../material.module";
import {NgIf} from "@angular/common";
import {UserService} from "../../serivces/user.service";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {AdminLayoutComponent} from "../../admin-layout/admin-layout.component";

export interface UserData {
  id: number;
  fullName: string;
  email: string;
  role: string;
  displayPicture?: string;
}

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  standalone: true,
  imports: [
    MatPaginator,
    MatTable,
    MatSort,
    MatIcon,
    MaterialModule,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgIf,
    MatSortModule
  ],
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'displayPicture', 'fullName', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<UserData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private userService: UserService, private snackBar: MatSnackBar, private adminLayout: AdminLayoutComponent) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.userService.getUserImages().subscribe(images => {
        users.forEach((user: UserData) => {
          const image = images.find((img: any) => img.user.id === user.id);
          if (image) {
            user.displayPicture = `data:image/jpeg;base64,${image.displayPicture}`;
          }
        });
        this.dataSource.data = users;
      });
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user: UserData): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(() => {
          this.fetchUsers();
        });
      }
    });
  }



  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() => { }, error => {
          this.fetchUsers(); // Ensure the table updates after deletion
          this.snackBar.open('Delete User Successfully', 'Close', {
            duration: 3000
          });
        });
      }
    });
  }

  backgroundColor = computed(() => this.adminLayout.darkMode() ? '#333' : '#c7c7c7');
  textColor = computed(() => this.adminLayout.darkMode() ? '#fff' : '#333');
  iconColor = computed(() => this.adminLayout.darkMode() ? '#fff' : '#333');
  containersBackgroundColor = computed(() => this.adminLayout.darkMode() ? '#444' : '#ffffff');
}
