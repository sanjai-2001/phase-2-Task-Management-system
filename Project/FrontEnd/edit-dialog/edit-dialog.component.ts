import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from 'src/app/models/Task.model';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/task.service';
import { TASK_DATA } from '../data-table/data-table.component';



@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  editedElement: Task;
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService
  ) {
    console.log(data); // Check if data is received correctly
    this.editedElement = { ...data };
  }

  saveChanges() {
    this.taskService.updateTask(this.editedElement).subscribe(
      updatedTask => {
        // Update the task in the data source
        const index = TASK_DATA.findIndex(item => item.taskId === updatedTask.taskId);
        if (index !== -1) {
          TASK_DATA[index] = updatedTask;
          this.dataSource.data = TASK_DATA;
        }
      },
      error => {
        console.error('Error updating task:', error);
      }
    );

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
