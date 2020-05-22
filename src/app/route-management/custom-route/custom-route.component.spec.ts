import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRouteComponent } from './customer-route.component';

describe('CustomerRouteComponent', () => {
  let component: CustomerRouteComponent;
  let fixture: ComponentFixture<CustomerRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
