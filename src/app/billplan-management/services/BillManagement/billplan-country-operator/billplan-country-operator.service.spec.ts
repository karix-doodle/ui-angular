import { TestBed } from '@angular/core/testing';

import { BillplanCountryOperatorService } from './billplan-country-operator.service';

describe('BillplanCountryOperatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillplanCountryOperatorService = TestBed.get(BillplanCountryOperatorService);
    expect(service).toBeTruthy();
  });
});
