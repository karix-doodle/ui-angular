import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmViewLogComponent } from './cm-view-log.component';

describe('CmViewLogComponent', () => {
  let component: CmViewLogComponent;
  let fixture: ComponentFixture<CmViewLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmViewLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmViewLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
