import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtFileAuditLogComponent } from './gt-file-audit-log.component';

describe('GtFileAuditLogComponent', () => {
  let component: GtFileAuditLogComponent;
  let fixture: ComponentFixture<GtFileAuditLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtFileAuditLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtFileAuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
