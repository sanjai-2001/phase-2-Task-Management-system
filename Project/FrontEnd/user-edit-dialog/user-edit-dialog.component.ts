import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/Task.model';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {
  editedElement: Task;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    console.log(data); // Check if data is received correctly
    this.editedElement = { ...data };
  }

  saveChanges() {
    this.dialogRef.close(this.editedElement);
  }

  cancel() {
    this.dialogRef.close();
  }
}
