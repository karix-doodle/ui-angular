import { TestBed } from '@angular/core/testing';

import { GatewayManagementService } from './gateway-management.service';

describe('GatewayManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GatewayManagementService = TestBed.get(GatewayManagementService);
    expect(service).toBeTruthy();
  });
});
