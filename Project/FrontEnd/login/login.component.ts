import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  userDetails: any;



  constructor(private fb: FormBuilder, public loginservice: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  validateForm() {
    if (this.loginForm.valid) {
      let formvalue = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
  
      this.loginservice.Login(formvalue).subscribe(
        (data: any) => {
          console.log(data);
  
          sessionStorage.setItem('userDetails', JSON.stringify(data));
          this.userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
  
          if (this.userDetails && (this.userDetails.roleId === 1 || this.userDetails.roleId === 2)) {
            // Navigate to the dashboard
            this.router.navigate(['/dashboard']);
          }
        },
        (err: any) => {
          alert('Invalid Credentials');
        }
      );
    }
  }
}
     
  // username: string = '';
// password: string = '';

// validateForm(): boolean {
//   if (this.username === '' || this.password === '') {
//     alert('Please fill in all fields.');
//     return false;
//   }
//   return true;
// }
