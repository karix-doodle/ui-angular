import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStepperFormComponent } from './group-stepper-form.component';

describe('GroupStepperFormComponent', () => {
  let component: GroupStepperFormComponent;
  let fixture: ComponentFixture<GroupStepperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupStepperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
