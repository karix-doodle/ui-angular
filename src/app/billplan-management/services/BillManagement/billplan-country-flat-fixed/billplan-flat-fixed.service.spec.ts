import { TestBed } from '@angular/core/testing';

import { BillplanFlatFixedService } from './billplan-flat-fixed.service';

describe('BillplanFlatFixedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillplanFlatFixedService = TestBed.get(BillplanFlatFixedService);
    expect(service).toBeTruthy();
  });
});
