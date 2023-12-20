import { TestBed } from '@angular/core/testing';

import { DatagenerationService } from './datageneration.service';

describe('DatagenerationService', () => {
  let service: DatagenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatagenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
