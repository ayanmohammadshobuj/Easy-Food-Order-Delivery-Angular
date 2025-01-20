import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import { NgIf } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { FoodService } from "../../services/food.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddItemsRestaurantComponent } from "../add-items-restaurant/add-items-restaurant.component";
import { UpdateFoodComponent } from "../update-food/update-food.component";

export interface FoodData {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  creationDate: string;
  foodCategory: { id: number, name: string, image: string | null };
  image: string;
}

@Component({
  selector: 'app-items-restaurant',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSort,
    MatCellDef,
    MatCell,
    NgIf,
    MatIcon,
    MatMiniFabButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatButton,
    MatSortModule
  ],
  templateUrl: './items-restaurant.component.html',
  styleUrl: './items-restaurant.component.css'
})
export class ItemsRestaurantComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'available', 'foodCategory', 'image', 'action'];
  dataSource = new MatTableDataSource<FoodData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private foodService: FoodService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchFoods();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchFoods(): void {
    this.foodService.getFoods().subscribe(foods => {
      this.dataSource.data = foods;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addFood(): void {
    const dialogRef = this.dialog.open(AddItemsRestaurantComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchFoods();
      }
    });
  }

  editFood(food: FoodData): void {
    const dialogRef = this.dialog.open(UpdateFoodComponent, {
      width: '600px',
      data: { id: food.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchFoods();
      }
    });
  }

  deleteFood(id: number): void {
    this.foodService.deleteFood(id).subscribe(() => {
      this.fetchFoods();
      this.snackBar.open('Food deleted successfully', 'Close', {
        duration: 3000
      });
    });
  }
}
