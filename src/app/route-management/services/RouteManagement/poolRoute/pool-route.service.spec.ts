import { TestBed } from '@angular/core/testing';

import { PoolRouteService } from './pool-route.service';

describe('PoolRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoolRouteService = TestBed.get(PoolRouteService);
    expect(service).toBeTruthy();
  });
});
