import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtFileAuditLogViewComponent } from './gt-file-audit-log-view.component';

describe('GtFileAuditLogViewComponent', () => {
  let component: GtFileAuditLogViewComponent;
  let fixture: ComponentFixture<GtFileAuditLogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtFileAuditLogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtFileAuditLogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
