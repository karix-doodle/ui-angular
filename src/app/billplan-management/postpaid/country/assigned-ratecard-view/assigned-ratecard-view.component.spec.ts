import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedRatecardViewComponent } from './assigned-ratecard-view.component';

describe('AssignedRatecardViewComponent', () => {
  let component: AssignedRatecardViewComponent;
  let fixture: ComponentFixture<AssignedRatecardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedRatecardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedRatecardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
