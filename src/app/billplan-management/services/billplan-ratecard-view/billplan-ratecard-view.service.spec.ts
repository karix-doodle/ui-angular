import { TestBed } from '@angular/core/testing';

import { BillplanRatecardViewService } from './billplan-ratecard-view.service';

describe('BillplanRatecardViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillplanRatecardViewService = TestBed.get(BillplanRatecardViewService);
    expect(service).toBeTruthy();
  });
});
