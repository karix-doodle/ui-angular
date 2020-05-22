import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderidMobileRouteComponent } from './senderid-mobile-route.component';

describe('SenderidMobileRouteComponent', () => {
  let component: SenderidMobileRouteComponent;
  let fixture: ComponentFixture<SenderidMobileRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderidMobileRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderidMobileRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
