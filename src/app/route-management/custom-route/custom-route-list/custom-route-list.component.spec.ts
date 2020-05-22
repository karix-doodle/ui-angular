import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRouteListComponent } from './custom-route-list.component';

describe('CustomRouteListComponent', () => {
  let component: CustomRouteListComponent;
  let fixture: ComponentFixture<CustomRouteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRouteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
