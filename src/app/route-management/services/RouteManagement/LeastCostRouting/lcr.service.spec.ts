import { TestBed } from '@angular/core/testing';

import { LcrService } from './lcr.service';

describe('LcrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LcrService = TestBed.get(LcrService);
    expect(service).toBeTruthy();
  });
});
