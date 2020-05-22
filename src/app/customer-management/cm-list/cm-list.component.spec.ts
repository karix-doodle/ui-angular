import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmListComponent } from './cm-list.component';

describe('CmListComponent', () => {
  let component: CmListComponent;
  let fixture: ComponentFixture<CmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
