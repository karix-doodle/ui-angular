import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistMenuComponent } from './blacklist-menu.component';

describe('BlacklistMenuComponent', () => {
  let component: BlacklistMenuComponent;
  let fixture: ComponentFixture<BlacklistMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
