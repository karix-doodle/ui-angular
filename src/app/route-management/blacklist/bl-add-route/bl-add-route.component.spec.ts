import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlAddRouteComponent } from './bl-add-route.component';

describe('BlAddRouteComponent', () => {
  let component: BlAddRouteComponent;
  let fixture: ComponentFixture<BlAddRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlAddRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlAddRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
