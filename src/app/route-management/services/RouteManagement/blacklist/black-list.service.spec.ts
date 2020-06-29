import { TestBed } from '@angular/core/testing';

import { BlackListService } from './black-list.service';

describe('BlackListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlackListService = TestBed.get(BlackListService);
    expect(service).toBeTruthy();
  });
});
