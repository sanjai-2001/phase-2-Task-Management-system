import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Simulated role data (replace with actual data)
  private roles = [
    { id: 1, name: 'Admin', privileges: ['admin'] },
    { id: 2, name: 'Employee', privileges: ['employee'] },
  ];

  constructor(public http: HttpClient) {}

  getRoleById(id: number) {
    return this.roles.find((role) => role.id === id);
  }

  hasAdminPrivileges(roleId: number) {
    const role = this.getRoleById(roleId);
    return role && role.privileges.includes('admin');
  }

  hasEmployeePrivileges(roleId: number) {
    const role = this.getRoleById(roleId);
    return role && role.privileges.includes('employee');
  }
  getUserRoleId(): number {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    return userDetails.roleId || 0; // Return 0 if role ID is not available
  }
  

  login(username: string, password: string, roleId: number): Observable<any> {
    const role = this.getRoleById(roleId);

    if (!role) {
      // Invalid role ID
      return throwError('Invalid role');
    }

    if (
      role.privileges.includes('admin') &&
      username === 'admin' &&
      password === 'admin'
    ) {
      // Successful admin login
      return of('Admin login successful');
    } else if (role.privileges.includes('employee'))  {
      // Successful employee login
      return of('Employee login successful');
    }
    // Invalid credentials or insufficient privileges
    return throwError('Invalid credentials');
  }
  Login(data: any) {
    const httpoptions : Object = { 
      params: {
        username: data.username,
        password: data.password
      },
    };
    return this.http.get('https://localhost:7171/api/Login/Login', httpoptions);
  }
}
