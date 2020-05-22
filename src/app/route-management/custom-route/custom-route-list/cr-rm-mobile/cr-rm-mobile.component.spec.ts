import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrRmMobileComponent } from './cr-rm-mobile.component';

describe('CrRmMobileComponent', () => {
  let component: CrRmMobileComponent;
  let fixture: ComponentFixture<CrRmMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrRmMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrRmMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
