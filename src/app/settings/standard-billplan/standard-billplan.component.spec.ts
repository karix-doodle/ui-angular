import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardBillplanComponent } from './standard-billplan.component';

describe('StandardBillplanComponent', () => {
  let component: StandardBillplanComponent;
  let fixture: ComponentFixture<StandardBillplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardBillplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardBillplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
