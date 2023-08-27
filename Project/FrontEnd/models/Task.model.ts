// Task.model.ts
export class Task {
  taskId: number;  // Use camelCase for property names
  empName: string;
  taskDescription: string;
  status: string;
  priority: string;
  assignedDate: string;
  completedDate: string;

  constructor(taskId: number, empName: string, taskDescription: string, status: string, priority: string, assignedDate: string, completedDate: string) {
    this.taskId = taskId;
    this.empName = empName;
    this.taskDescription = taskDescription;
    this.status = status;
    this.priority = priority;
    this.assignedDate = assignedDate;
    this.completedDate = completedDate;
  }
}

