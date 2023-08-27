import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private loginService: LoginService) {}

  isAdmin(roleId: number) {
    return this.loginService.hasAdminPrivileges(roleId);
  }

  login(username: string, password: string, roleId: number): Observable<any> {
    // Perform actual admin login logic here
    if (this.isAdmin(roleId)) {
      return this.loginService.login(username, password, roleId);
    }

    return new Observable((observer) => {
      observer.error('Invalid role');
    });
  }
}
