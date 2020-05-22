import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillplanListComponent } from './billplan-list.component';

describe('BillplanListComponent', () => {
  let component: BillplanListComponent;
  let fixture: ComponentFixture<BillplanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillplanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillplanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
