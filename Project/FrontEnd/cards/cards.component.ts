// import { Component, OnInit } from '@angular/core';
// import { TaskCountService } from '../task-count.service';

// @Component({
//   selector: 'app-cards',
//   templateUrl: './cards.component.html',
//   styleUrls: ['./cards.component.css']
// })
// export class CardsComponent implements OnInit {
//   todoCount: number = 0;
//   progressCount: number = 0;
//   completedCount: number = 0;

//   constructor(private taskCountService: TaskCountService) {}

//   ngOnInit(): void {
   
    
//     this.taskCountService.updateTaskCountsFromAPI(1003);

//     this.taskCountService.taskCounts$.subscribe(counts => {
//       this.todoCount = counts.toDoCount;
//       this.progressCount = counts.onProgressCount;
//       this.completedCount = counts.completedCount;
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { TaskCountService } from '../task-count.service';

// @Component({
//   selector: 'app-cards',
//   templateUrl: './cards.component.html',
//   styleUrls: ['./cards.component.css']
// })
// export class CardsComponent implements OnInit {
//   todoCount: number = 0;
//   progressCount: number = 0;
//   completedCount: number = 0;
//   userDetails: any;

//   constructor(private taskCountService: TaskCountService) {}

//   ngOnInit(): void {
//     this.userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    
//     if (this.userDetails && (this.userDetails.roleId === 1 || this.userDetails.roleId === 2)) {
//       const managerId = this.userDetails.empId;
//       this.taskCountService.updateTaskCountsFromAPI(managerId);

//       this.taskCountService.taskCounts$.subscribe(counts => {
//         this.todoCount = counts.toDoCount;
//         this.progressCount = counts.onProgressCount;
//         this.completedCount = counts.completedCount;
//       });
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { TaskCountService } from '../task-count.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  todoCount: number = 0;
  progressCount: number = 0;
  completedCount: number = 0;
  userDetails: any;

  constructor(private taskCountService: TaskCountService) {}

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    
    if (this.userDetails && (this.userDetails.roleId === 1 || this.userDetails.roleId === 2)) {
      const managerId = this.userDetails.empId;
      
      // Update task counts using the TaskCountService
      this.taskCountService.updateTaskCountsFromAPI(managerId);

      // Subscribe to the taskCounts$ observable to receive updated task counts
      this.taskCountService.taskCounts$.subscribe(counts => {
        this.todoCount = counts.toDoCount;
        this.progressCount = counts.onProgressCount;
        this.completedCount = counts.completedCount;
      });
    }
  }
}
