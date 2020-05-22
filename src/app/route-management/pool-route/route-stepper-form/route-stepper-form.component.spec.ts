import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteStepperFormComponent } from './route-stepper-form.component';

describe('RouteStepperFormComponent', () => {
  let component: RouteStepperFormComponent;
  let fixture: ComponentFixture<RouteStepperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteStepperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
