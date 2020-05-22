import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmMenuPageComponent } from './rm-menu-page.component';

describe('RmMenuPageComponent', () => {
  let component: RmMenuPageComponent;
  let fixture: ComponentFixture<RmMenuPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmMenuPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
