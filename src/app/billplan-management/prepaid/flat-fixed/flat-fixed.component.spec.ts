import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatFixedComponent } from './flat-fixed.component';

describe('FlatFixedComponent', () => {
  let component: FlatFixedComponent;
  let fixture: ComponentFixture<FlatFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
