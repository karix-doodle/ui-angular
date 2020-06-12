import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlMobileSenderidRouteComponent } from './bl-mobile-senderid-route.component';

describe('BlMobileSenderidRouteComponent', () => {
  let component: BlMobileSenderidRouteComponent;
  let fixture: ComponentFixture<BlMobileSenderidRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlMobileSenderidRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlMobileSenderidRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
