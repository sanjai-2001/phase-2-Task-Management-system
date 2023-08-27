// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/data-table/data-table.component';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://localhost:7171/api/Admin';
  constructor(private http: HttpClient) {}

  getTasksByManagerId(managerId: number): Observable<Task[]> {
    // Make an API call to fetch tasks for employees under the manager
    // const apiUrl = `https://localhost:7171/api/Admin/TaskDetails?managerid=1003`;
    const apiUrl = `${this.baseUrl}/TaskDetails?managerid=${managerId}`;
    return this.http.get<Task[]>(apiUrl);
  }
  deleteTask(taskId: number): Observable<any> {
    const apiUrl = `${this.baseUrl}/DeleteTask?task_id=${taskId}`;
    return this.http.delete(apiUrl);
  }
  // getTasksByStatusAndManager(status: string, managerId: number): Observable<Task[]> {
  //   return this.http.get<Task[]>(`https://localhost:7171/api/Admin/GetTaskByToDo?managerid=${managerId}&status=${status}`);
  // }
  getTasksByStatusAndManagerId(managerId: number, status: string): Observable<any> {
    const url = `${this.baseUrl}/Admin/GetTaskByToDo?managerid=${managerId}&status=${status}`;
    return this.http.get(url);
  }
  updateTask(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/UpdateTaskDetails?TaskId=${task.taskId}`;
    return this.http.put<Task>(url, task);
  }
 
}
