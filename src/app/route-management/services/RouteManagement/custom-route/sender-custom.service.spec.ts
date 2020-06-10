import { TestBed } from '@angular/core/testing';

import { SenderCustomService } from './sender-custom.service';

describe('SenderCustomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SenderCustomService = TestBed.get(SenderCustomService);
    expect(service).toBeTruthy();
  });
});
