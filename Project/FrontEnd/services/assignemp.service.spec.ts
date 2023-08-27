import { TestBed } from '@angular/core/testing';

import { AssignempService } from './assignemp.service';

describe('AssignempService', () => {
  let service: AssignempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
