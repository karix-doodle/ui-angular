import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtListingComponent } from './gt-listing.component';

describe('GtListingComponent', () => {
  let component: GtListingComponent;
  let fixture: ComponentFixture<GtListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtListingComponent ]
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
