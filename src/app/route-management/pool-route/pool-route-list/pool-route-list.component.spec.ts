import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolRouteListComponent } from './pool-route-list.component';

describe('PoolRouteListComponent', () => {
  let component: PoolRouteListComponent;
  let fixture: ComponentFixture<PoolRouteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolRouteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolRouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
