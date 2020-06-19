import { TestBed } from '@angular/core/testing';

import { CreateAssignRateCardService } from './create-assign-rate-card.service';

describe('CreateAssignRateCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateAssignRateCardService = TestBed.get(CreateAssignRateCardService);
    expect(service).toBeTruthy();
  });
});
