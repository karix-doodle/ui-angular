import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmLcrComponent } from './rm-lcr.component';

describe('RmLcrComponent', () => {
  let component: RmLcrComponent;
  let fixture: ComponentFixture<RmLcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmLcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmLcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
