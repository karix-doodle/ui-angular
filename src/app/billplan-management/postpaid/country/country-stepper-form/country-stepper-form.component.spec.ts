import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStepperFormComponent } from './country-stepper-form.component';

describe('CountryStepperFormComponent', () => {
  let component: CountryStepperFormComponent;
  let fixture: ComponentFixture<CountryStepperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryStepperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
