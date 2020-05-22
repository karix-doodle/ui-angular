import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmListTableComponent } from './cm-list-table.component';

describe('CmListTableComponent', () => {
  let component: CmListTableComponent;
  let fixture: ComponentFixture<CmListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
