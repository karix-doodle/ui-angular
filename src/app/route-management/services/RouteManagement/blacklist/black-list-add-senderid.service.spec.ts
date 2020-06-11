import { TestBed } from '@angular/core/testing';

import { BlackListAddSenderidService } from './black-list-add-senderid.service';

describe('BlaskListAddSenderidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlackListAddSenderidService = TestBed.get(BlackListAddSenderidService);
    expect(service).toBeTruthy();
  });
});
