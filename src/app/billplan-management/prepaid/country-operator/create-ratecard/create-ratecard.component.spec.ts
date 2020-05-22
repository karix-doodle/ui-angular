import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRatecardComponent } from './create-ratecard.component';

describe('CreateRatecardComponent', () => {
  let component: CreateRatecardComponent;
  let fixture: ComponentFixture<CreateRatecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRatecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRatecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
