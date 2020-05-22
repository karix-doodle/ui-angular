import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistRouteComponent } from './blacklist-route.component';

describe('BlacklistRouteComponent', () => {
  let component: BlacklistRouteComponent;
  let fixture: ComponentFixture<BlacklistRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
