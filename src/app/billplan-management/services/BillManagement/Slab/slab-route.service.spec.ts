import { TestBed } from '@angular/core/testing';

import { SlabRouteService } from './slab-route.service';

describe('SlabRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlabRouteService = TestBed.get(SlabRouteService);
    expect(service).toBeTruthy();
  });
});
