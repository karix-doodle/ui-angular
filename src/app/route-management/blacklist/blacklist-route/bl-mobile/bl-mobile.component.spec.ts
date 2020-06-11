import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlMobileComponent } from './bl-mobile.component';

describe('BlMobileComponent', () => {
  let component: BlMobileComponent;
  let fixture: ComponentFixture<BlMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
