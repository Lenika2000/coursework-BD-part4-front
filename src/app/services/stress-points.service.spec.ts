import { TestBed } from '@angular/core/testing';

import { StressPointsService } from './stress-points.service';

describe('StressPointsService', () => {
  let service: StressPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StressPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
