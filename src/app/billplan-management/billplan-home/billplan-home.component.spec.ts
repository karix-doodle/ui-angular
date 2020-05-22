import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillplanHomeComponent } from './billplan-home.component';

describe('BillplanHomeComponent', () => {
  let component: BillplanHomeComponent;
  let fixture: ComponentFixture<BillplanHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillplanHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillplanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
