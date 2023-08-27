import { Component, OnInit } from '@angular/core';
import { AssignempService } from 'src/app/services/assignemp.service'
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-task-assignment-form',
  templateUrl: './task-assignment-form.component.html',
  styleUrls: ['./task-assignment-form.component.css']
})
export class TaskAssignmentFormComponent implements OnInit {

  constructor(
    private Assignemp: AssignempService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  taskForm!: FormGroup;
  data: any;

  ngOnInit(): void {
    let getdata = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    
    this.Assignemp.getEmployeeNames(getdata.empId).subscribe(
      (data: any) => {
        this.data = data;
        console.log(data);
      }
    );

    this.taskForm = this.formBuilder.group({
      empName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      priority: ['', Validators.required],
      assignedDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      status : 'ToDo'
    });
  }

  // assignTask() {
  //   if (this.taskForm.valid) {
  //     const taskData = this.taskForm.value;
  //     this.http.post('https://localhost:7171/api/Admin/CreateTask', taskData).subscribe(
  //       (response: any) => {
  //         console.log('Task assigned successfully:', response);
  //         // Reset the form after successful assignment
  //         this.taskForm.reset();
  //       },
  //       (error: any) => {
  //         console.error('Error assigning task:', error);
  //       }
  //     );
  //   }
  // }
  assignTask(): void{
    console.log(this.taskForm.value);
    this.Assignemp.submit(this.taskForm.value).subscribe(response => {
      // alert('form submitted');
       this.router.navigate(['/dashboard']);
    });
  }
}
