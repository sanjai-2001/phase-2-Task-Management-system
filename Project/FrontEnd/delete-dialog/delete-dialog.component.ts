// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-delete-dialog',
//   templateUrl: './delete-dialog.component.html',
//   styleUrls: ['./delete-dialog.component.css']
// })
// export class DeleteDialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<DeleteDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}
    
//   confirmDelete() {
//     this.dialogRef.close(true);
//   }

//   cancel() {
//     this.dialogRef.close(false);
//   }
  
// }

// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { HttpClient } from '@angular/common/http';
// @Component({
//   selector: 'app-delete-dialog',
//   templateUrl: './delete-dialog.component.html',
//   styleUrls: ['./delete-dialog.component.css']
// })
// export class DeleteDialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<DeleteDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   confirmDelete() {
//     this.dialogRef.close(true);
//   }

//   cancel() {
//     this.dialogRef.close(false);
//   }
// }

// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-delete-dialog',
//   templateUrl: './delete-dialog.component.html',
//   styleUrls: ['./delete-dialog.component.css']
// })
// export class DeleteDialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<DeleteDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private http: HttpClient
//   ) {}

//   confirmDelete() {
//     this.http.delete(`https://localhost:7171/api/Admin/DeleteTask?task_id=116`)
//       .subscribe(
//         (response) => {
//           // Task deleted successfully. You can emit an event here.
//           this.dialogRef.close(true);
//         },
//         (error) => {
//           // Handle error here.
//           console.error('Error deleting task:', error);
//         }
//       );
//   }

//   cancel() {
//     this.dialogRef.close(false);
//   }
// }


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  confirmDelete(taskId: number) {
    const apiUrl = `https://localhost:7171/api/Admin/DeleteTask?task_id=${taskId}`;
    this.http.delete(apiUrl)
      .subscribe(
        (response) => {
          // Task deleted successfully. You can emit an event here.
          this.dialogRef.close(true);
        },
        (error) => {
          // Handle error here.
          console.error('Error deleting task:', error);
        }
      );
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
