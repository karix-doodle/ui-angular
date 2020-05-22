import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillplanManagementComponent } from './billplan-management.component';

describe('BillplanManagementComponent', () => {
  let component: BillplanManagementComponent;
  let fixture: ComponentFixture<BillplanManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillplanManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillplanManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
