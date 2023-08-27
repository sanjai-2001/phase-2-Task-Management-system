import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { UserEditDialogComponent } from 'src/app/user-edit-dialog/user-edit-dialog.component'; 
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import * as jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export interface Task {
  taskId: number;
  employeeName: string;
  taskDescription: string;
  status: string;
  priority: string;
  assignedDate: string;
  completedDate: string;
}

// Add a constructor to the Task class
export class Task implements Task {
  constructor(
    public taskId: number,
    public employeeName: string,
    public taskDescription: string,
    public status: string,
    public priority: string,
    public assignedDate: string,
    public completedDate: string
  ) {}
}

const TASK_DATA: Task[] = [
  new Task(1, 'John Doe', 'Complete project report', 'On Progress', 'High', '2023-08-15', '2023-08-25'),
  new Task(2, 'Jane Smith', 'Review presentation slides', 'Todo', 'Medium', '2023-08-16', '2023-08-20'),
  new Task(3, 'Michael Johnson', 'Test application functionality', 'Completed', 'Low', '2023-08-17', '2023-08-18'),
  new Task(4, 'Emily Brown', 'Write user documentation', 'On Progress', 'High', '2023-08-18', '2023-08-28'),
  new Task(5, 'David Wilson', 'Fix bugs in backend code', 'Completed', 'Medium', '2023-08-19', '2023-08-22'),
];
@Component({
  selector: 'app-user-data-table', // This selector should match your HTML element
  templateUrl: './user-data-table.component.html',
  styleUrls: ['./user-data-table.component.css']
})
export class UserDataTableComponent implements OnInit {
  getStatusStyles(status: string) {
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
        styles = { color: 'black', 'background-color': 'white' }; // Default styles
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
    'delete'
  ];
  dataSource = new MatTableDataSource<Task>(TASK_DATA);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true }) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(element: Task) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = TASK_DATA.findIndex(item => item.taskId === element.taskId);
        if (index !== -1) {
          TASK_DATA[index] = result;
          this.dataSource.data = TASK_DATA;
        }
      }
    });
  }

  deleteRow(element: Task) {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      data: element.taskDescription
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        TASK_DATA.splice(TASK_DATA.indexOf(element), 1);
        this.dataSource.data = TASK_DATA;
      }
    });
  }
  exportToExcel() {
    const excelData = this.dataSource.filteredData.map(item => ({
      TaskId: item.taskId,
      EmployeeName: item.employeeName,
      TaskDescription: item.taskDescription,
      Status: item.status,
      Priority: item.priority,
      AssignedDate: item.assignedDate,
      CompletedDate: item.completedDate
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    this.saveAsExcelFile(excelBuffer, 'table-export.xlsx');
  }
  
  saveAsExcelFile(buffer: any, filename: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }

}

