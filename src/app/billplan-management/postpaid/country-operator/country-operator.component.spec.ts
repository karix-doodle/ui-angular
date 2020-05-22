import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOperatorComponent } from './country-operator.component';

describe('CountryOperatorComponent', () => {
  let component: CountryOperatorComponent;
  let fixture: ComponentFixture<CountryOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
