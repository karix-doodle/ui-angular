import { TestBed } from '@angular/core/testing';

import { RouteManagementService } from './route-management.service';

describe('RouteManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteManagementService = TestBed.get(RouteManagementService);
    expect(service).toBeTruthy();
  });
});
