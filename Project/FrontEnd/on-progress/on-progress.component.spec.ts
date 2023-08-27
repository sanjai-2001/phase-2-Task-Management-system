import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnProgressComponent } from './on-progress.component';

describe('OnProgressComponent', () => {
  let component: OnProgressComponent;
  let fixture: ComponentFixture<OnProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnProgressComponent]
    });
    fixture = TestBed.createComponent(OnProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
