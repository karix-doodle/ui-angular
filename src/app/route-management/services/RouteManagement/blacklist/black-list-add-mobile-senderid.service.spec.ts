import { TestBed } from '@angular/core/testing';

import { BlackListAddMobileSenderidService } from './black-list-add-mobile-senderid.service';
describe('BlaskListAddMobileSenderidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlackListAddMobileSenderidService = TestBed.get(BlackListAddMobileSenderidService);
    expect(service).toBeTruthy();
  });
});
