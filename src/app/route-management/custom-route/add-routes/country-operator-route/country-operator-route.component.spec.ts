import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOperatorRouteComponent } from './country-operator-route.component';

describe('CountryOperatorRouteComponent', () => {
  let component: CountryOperatorRouteComponent;
  let fixture: ComponentFixture<CountryOperatorRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryOperatorRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryOperatorRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
