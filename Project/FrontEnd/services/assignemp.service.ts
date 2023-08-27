import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignempService {

  constructor(private http: HttpClient) {}

  getEmployeeNames(managerId: string): Observable<string[]> {
    const httpOptions : Object = { 
      params: {
        managerid: managerId
      },
    };
    
    // Make an API call to get employee names
    return this.http.get<string[]>('https://localhost:7171/api/Admin/EmployeeDetails', httpOptions);
  }
  public submit(sk: any): Observable<any> {
    console.log(sk);
    return this.http.post(`https://localhost:7171/api/Admin/CreateTask`,sk);
  }
}
