import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCountryOperatorListComponent } from './global-country-operator-list.component';

describe('GlobalCountryOperatorListComponent', () => {
  let component: GlobalCountryOperatorListComponent;
  let fixture: ComponentFixture<GlobalCountryOperatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalCountryOperatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCountryOperatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
