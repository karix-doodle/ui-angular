import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolRouteComponent } from './pool-route.component';

describe('PoolRouteComponent', () => {
  let component: PoolRouteComponent;
  let fixture: ComponentFixture<PoolRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
