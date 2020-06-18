import { TestBed } from '@angular/core/testing';

import { GroupRouteService } from './group-route.service';

describe('GroupRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupRouteService = TestBed.get(GroupRouteService);
    expect(service).toBeTruthy();
  });
});
