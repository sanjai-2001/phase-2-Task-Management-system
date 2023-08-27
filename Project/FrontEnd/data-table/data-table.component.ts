import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { EditDialogComponent } from 'src/app/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { TaskService } from 'src/app/task.service'; // Make sure to import your TaskService

// ... (Task class definition)

export class Task {
  taskId: number;
  empName: string;
  taskDescription: string;
  status: string;
  priority: string;
  assignedDate: string;
  completedDate: string;

  constructor(
    taskId: number,
    empName: string,
    taskDescription: string,
    status: string,
    priority: string,
    assignedDate: string,
    completedDate: string
  ) {
    this.taskId = taskId;
    this.empName = empName;
    this.taskDescription = taskDescription;
    this.status = status;
    this.priority = priority;
    this.assignedDate = assignedDate;
    this.completedDate = completedDate;
  }
}
export const TASK_DATA: Task[] = [];
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  getStatusStyles(status: string) {
    console.log('getStatusStyles called with status:', status);
    // getStatusStyles(status: string) {
    let styles = {};
    switch (status) {
      case 'Todo':
        styles = { color: 'white', 'background-color': 'red' };
        break;
      case 'On Progress':
        styles = { color: 'black', 'background-color': 'yellow' };
        break;
      case 'Completed':
        styles = { color: 'white', 'background-color': 'green' };
        break;
      default:
        styles = { color: 'black', 'background-color': 'white' };
        // Default styles

        break;
    }
    return styles;
  }

  displayedColumns: string[] = [
    'taskId',
    'employeeName',
    'taskDescription',
    'status',
    'priority',
    'assignedDate',
    'completedDate',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Task>(TASK_DATA);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private taskService: TaskService) {}
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    const userDetails = JSON.parse(
      sessionStorage.getItem('userDetails') || '{}'
    );
    if (userDetails) {
      if (userDetails.roleId === 1) {
        // Manager
        this.taskService.getTasksByManagerId(userDetails.empId).subscribe(
          (tasks) => {
            this.dataSource.data = tasks;
            console.log(tasks);
          },
          (error) => {
            console.error('Error fetching tasks:', error);
          }
        );
      } else {
        // Other role logic if needed
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editRow(element: Task) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(result).subscribe(
          (updatedTask) => {
            // Update the task in the data source
            const index = TASK_DATA.findIndex(
              (item) => item.taskId === updatedTask.taskId
            );
            if (index !== -1) {
              TASK_DATA[index] = updatedTask;
              this.dataSource.data = TASK_DATA;
            }
          },
          (error) => {
            console.error('Error updating task:', error);
          }
        );
      }
    });
  }


  deleteRow(element: Task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: element.taskId, // Pass the task ID as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.taskService.deleteTask(element.taskId).subscribe(
          () => {
            // Task deleted successfully.
            const index = this.dataSource.data.findIndex(
              (task) => task.taskId === element.taskId
            );
            if (index !== -1) {
              this.dataSource.data.splice(index, 1); // Remove the task from the data array
              this.dataSource._updateChangeSubscription(); // Update the datatable
            }
          },
          (error) => {
            // Handle error here.
            console.error('Error deleting task:', error);
          }
        );
      }
    });
  }

  exportToExcel() {
    const excelData = this.dataSource.filteredData.map((item) => ({
      TaskId: item.taskId,
      EmployeeName: item.empName,
      TaskDescription: item.taskDescription,
      Status: item.status,
      Priority: item.priority,
      AssignedDate: item.assignedDate,
      CompletedDate: item.completedDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, 'task-export.xlsx');
  }

  saveAsExcelFile(buffer: any, filename: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }
}
