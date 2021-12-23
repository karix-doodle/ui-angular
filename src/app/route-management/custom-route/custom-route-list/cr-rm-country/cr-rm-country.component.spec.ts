import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrRmCountryComponent } from './cr-rm-country.component';

describe('CrRmCountryComponent', () => {
  let component: CrRmCountryComponent;
  let fixture: ComponentFixture<CrRmCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrRmCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrRmCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
