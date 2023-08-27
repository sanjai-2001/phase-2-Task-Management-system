import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit{
    todoCount: number = 0;
    progressCount: number = 0;
    completedCount: number = 0;
  
    // This is just an example data source, replace it with your actual data source
    tasks: any[] = [
      { status: 'todo' },
      { status: 'inProgress' },
      { status: 'completed' },
      // ... more tasks
    ];
  
    constructor() { }
  
    ngOnInit(): void {
      this.calculateTaskCounts();
    }
  
    calculateTaskCounts() {
      this.todoCount = this.tasks.filter(task => task.status === 'todo').length;
      this.progressCount = this.tasks.filter(task => task.status === 'inProgress').length;
      this.completedCount = this.tasks.filter(task => task.status === 'completed').length;
    }
}
