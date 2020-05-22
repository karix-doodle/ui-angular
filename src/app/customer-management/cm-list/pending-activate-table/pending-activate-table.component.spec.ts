import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingActivateTableComponent } from './pending-activate-table.component';

describe('PendingActivateTableComponent', () => {
  let component: PendingActivateTableComponent;
  let fixture: ComponentFixture<PendingActivateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingActivateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingActivateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
