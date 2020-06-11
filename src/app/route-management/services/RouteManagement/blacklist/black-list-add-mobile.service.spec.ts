import { TestBed } from '@angular/core/testing';

import { BlackListAddMobileService } from './black-list-add-mobile.service';

describe('BlaskListAddMobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlackListAddMobileService = TestBed.get(BlackListAddMobileService);
    expect(service).toBeTruthy();
  });
});
