import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignmentFormComponent } from './task-assignment-form.component';

describe('TaskAssignmentFormComponent', () => {
  let component: TaskAssignmentFormComponent;
  let fixture: ComponentFixture<TaskAssignmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAssignmentFormComponent]
    });
    fixture = TestBed.createComponent(TaskAssignmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
