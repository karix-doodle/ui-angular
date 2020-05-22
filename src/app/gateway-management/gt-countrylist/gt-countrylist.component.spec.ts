import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtCountrylistComponent } from './gt-countrylist.component';

describe('GtCountrylistComponent', () => {
  let component: GtCountrylistComponent;
  let fixture: ComponentFixture<GtCountrylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtCountrylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtCountrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
