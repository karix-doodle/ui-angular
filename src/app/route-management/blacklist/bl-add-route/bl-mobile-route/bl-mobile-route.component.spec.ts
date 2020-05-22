import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlMobileRouteComponent } from './bl-mobile-route.component';

describe('BlMobileRouteComponent', () => {
  let component: BlMobileRouteComponent;
  let fixture: ComponentFixture<BlMobileRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlMobileRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlMobileRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
