import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { UserService } from '../../serivces/user.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  userForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      id: [data.id, Validators.required],
      fullName: [data.fullName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      role: [data.role, Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  save(): void {
    if (this.userForm.valid) {
      const userId = this.userForm.value.id;
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        if (this.data.displayPicture) {
          this.userService.updateUserImage(userId, formData).subscribe(() => {
            this.dialogRef.close(this.userForm.value);
          });
        } else {
          this.userService.createUserImage(userId, formData).subscribe(() => {
            this.dialogRef.close(this.userForm.value);
          });
        }
      } else {
        this.dialogRef.close(this.userForm.value);
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
