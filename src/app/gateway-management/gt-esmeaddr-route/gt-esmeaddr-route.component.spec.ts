import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtESMEAddrRoutedComponent } from './gt-esmeaddr-route.component';

describe('GtESMEAddrRoutedComponent', () => {
  let component: GtESMEAddrRoutedComponent;
  let fixture: ComponentFixture<GtESMEAddrRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GtESMEAddrRoutedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtESMEAddrRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
