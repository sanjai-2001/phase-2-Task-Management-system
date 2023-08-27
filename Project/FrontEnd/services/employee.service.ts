import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private loginservice: LoginService) {}

  isEmployee(roleId: number) {
    return this.loginservice.hasEmployeePrivileges(roleId);
  }

  login(username: string, password: string, roleId: number): Observable<any> {
    // Perform actual employee login logic here
    if (this.isEmployee(roleId)) {
      return this.loginservice.login(username, password, roleId);
    }
    return throwError('Invalid role');
  }
}
