import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOperatorStepperFormComponent } from './country-operator-stepper-form.component';

describe('CountryOperatorStepperFormComponent', () => {
  let component: CountryOperatorStepperFormComponent;
  let fixture: ComponentFixture<CountryOperatorStepperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryOperatorStepperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryOperatorStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
