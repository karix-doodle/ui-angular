import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtCountryListViewLogComponent } from './gt-country-list-view-log.component';

describe('GtCountryListViewLogComponent', () => {
  let component: GtCountryListViewLogComponent;
  let fixture: ComponentFixture<GtCountryListViewLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtCountryListViewLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtCountryListViewLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
