import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtDetailsViewLogComponent } from './gt-details-view-log.component';

describe('GtDetailsViewLogComponent', () => {
  let component: GtDetailsViewLogComponent;
  let fixture: ComponentFixture<GtDetailsViewLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtDetailsViewLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtDetailsViewLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
