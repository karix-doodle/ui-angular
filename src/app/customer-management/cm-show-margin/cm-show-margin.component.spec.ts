import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmShowMarginComponent } from './cm-show-margin.component';

describe('CmShowMarginComponent', () => {
  let component: CmShowMarginComponent;
  let fixture: ComponentFixture<CmShowMarginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmShowMarginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmShowMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
