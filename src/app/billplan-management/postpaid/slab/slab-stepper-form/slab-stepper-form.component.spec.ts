import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlabStepperFormComponent } from './slab-stepper-form.component';

describe('SlabStepperFormComponent', () => {
  let component: SlabStepperFormComponent;
  let fixture: ComponentFixture<SlabStepperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlabStepperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlabStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
