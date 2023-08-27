// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';

// interface CountTask {
//   toDoCount: number;
//   onProgressCount: number;
//   completedCount: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskCountService {
//   private taskCountsSource = new BehaviorSubject<CountTask>({
//     toDoCount: 0,
//     onProgressCount: 0,
//     completedCount: 0
//   });

//   taskCounts$ = this.taskCountsSource.asObservable();

//   constructor(private http: HttpClient) {}

//   updateTaskCountsFromAPI(managerId: number): void {
//     const apiUrl = `https://localhost:7171/api/Admin/GetCount?managerid=${managerId}`;
//     this.http.get<CountTask>(apiUrl).subscribe(countTask => {
//       this.taskCountsSource.next(countTask);
//     });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface CountTask {
  toDoCount: number;
  onProgressCount: number;
  completedCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskCountService {
  private taskCountsSource = new BehaviorSubject<CountTask>({
    toDoCount: 0,
    onProgressCount: 0,
    completedCount: 0
  });

  taskCounts$ = this.taskCountsSource.asObservable();

  constructor(private http: HttpClient) {}

  updateTaskCountsFromAPI(managerId: number): void {
    const apiUrl = `https://localhost:7171/api/Admin/GetCount?managerid=${managerId}`;
    this.http.get<CountTask>(apiUrl).subscribe(countTask => {
      this.taskCountsSource.next(countTask);
    });
  }
}
