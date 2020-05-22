import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAuditLogComponent } from './cm-audit-log.component';

describe('CmAuditLogComponent', () => {
  let component: CmAuditLogComponent;
  let fixture: ComponentFixture<CmAuditLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmAuditLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmAuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
