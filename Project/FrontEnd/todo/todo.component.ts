import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/Task.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component'; // Adjust the path
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'; // Adjust the path
import { TASK_DATA } from '../models/task-data';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  private managerId: number | undefined;
  private status: string = 'ToDo';
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['taskId', 'employeeName', 'taskDescription', 'status', 'priority', 'assignedDate', 'completedDate', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Task>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true }) paginator!: MatPaginator;

  constructor( private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit() {

    this.fetchTodoTasks();
   
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  fetchTodoTasks() {
    const getdata = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    const managerId = getdata.empId; // Your manager ID
    const status = 'ToDo';
  
    const apiUrl = `https://localhost:7171/api/Admin/GetTaskByToDo?managerid=${managerId}&status=${status}`;
    
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        // Assuming the API returns an array of tasks, update your dataSource with the retrieved tasks
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  editRow(element: Task) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = TASK_DATA.findIndex(item => item.taskId === element.taskId);
        if (index !== -1) {
          // Update other properties of the task
          TASK_DATA[index].taskId = result.taskId;
          TASK_DATA[index].empName = result.employeeName;
          TASK_DATA[index].taskDescription = result.taskDescription;
          TASK_DATA[index].status = result.status;
          TASK_DATA[index].priority = result.priority;
          TASK_DATA[index].assignedDate = result.assignedDate;
          TASK_DATA[index].completedDate = result.completedDate;
          
          // Check if the status has changed
          if (TASK_DATA[index].status !== result.status) {
            TASK_DATA[index].status = result.status;
            this.dataSource.data = TASK_DATA.filter(task => task.status === 'Todo'); // Update dataSource with filtered data
          }
        }
      }
    });
  }

  deleteRow(element: Task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: element.taskDescription
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const index = TASK_DATA.indexOf(element);
        if (index !== -1) {
          TASK_DATA.splice(index, 1);
          this.dataSource.data = TASK_DATA.filter(task => task.status === 'Todo'); // Update dataSource with filtered data
        }
      }
    });
  }
  exportToExcel() {
    const excelData = this.dataSource.filteredData.map(item => ({
      TaskId: item.taskId,
      EmployeeName: item.empName,
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
