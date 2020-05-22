import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOperatorListComponent } from './country-operator-list.component';

describe('CountryOperatorListComponent', () => {
  let component: CountryOperatorListComponent;
  let fixture: ComponentFixture<CountryOperatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryOperatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryOperatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
