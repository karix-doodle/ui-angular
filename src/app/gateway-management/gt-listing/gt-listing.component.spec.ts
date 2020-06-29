import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtListingComponent } from './gt-listing.component';
import { CommonModule } from '@angular/common';
import { GatewayManagementService } from '../services/gateway-management.service';
import { HttpClientModule } from '@angular/common/http';

describe('GtListingComponent', () => {
  let component: GtListingComponent;
  let fixture: ComponentFixture<GtListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GtListingComponent],
      imports: [CommonModule, HttpClientModule],
      providers: [GatewayManagementService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
