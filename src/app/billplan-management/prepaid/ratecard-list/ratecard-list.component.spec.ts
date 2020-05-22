import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatecardListComponent } from './ratecard-list.component';

describe('RatecardListComponent', () => {
  let component: RatecardListComponent;
  let fixture: ComponentFixture<RatecardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatecardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatecardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
