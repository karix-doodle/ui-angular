import { TestBed } from '@angular/core/testing';

import { GatewayManagementService } from './gateway-management.service';
import { HttpClientModule } from '@angular/common/http';
import { GtListingComponent } from '../gt-listing/gt-listing.component';

describe('GatewayManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [GtListingComponent],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: GatewayManagementService = TestBed.get(GatewayManagementService);
    expect(service).toBeTruthy();
  });
});
