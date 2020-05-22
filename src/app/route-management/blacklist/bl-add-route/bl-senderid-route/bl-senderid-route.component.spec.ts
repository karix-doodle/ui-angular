import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlSenderidRouteComponent } from './bl-senderid-route.component';

describe('BlSenderidRouteComponent', () => {
  let component: BlSenderidRouteComponent;
  let fixture: ComponentFixture<BlSenderidRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlSenderidRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlSenderidRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
