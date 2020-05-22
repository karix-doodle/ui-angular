import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrMenuComponent } from './cr-menu.component';

describe('CrMenuComponent', () => {
  let component: CrMenuComponent;
  let fixture: ComponentFixture<CrMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
