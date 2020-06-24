import { TestBed } from '@angular/core/testing';

import { BillplanCountryService } from './billplan-country.service';

describe('BillplanCountryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillplanCountryService = TestBed.get(BillplanCountryService);
    expect(service).toBeTruthy();
  });
});
