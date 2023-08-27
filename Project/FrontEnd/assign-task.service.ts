
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignTaskService {
  private apiUrl = 'https://your-api-url/api/tasks'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  assignTask(taskData: any): Observable<any> {
    return this.http.post(this.apiUrl, taskData);
  }
}
