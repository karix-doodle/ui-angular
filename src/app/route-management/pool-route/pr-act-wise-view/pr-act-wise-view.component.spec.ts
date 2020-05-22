import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrActWiseViewComponent } from './pr-act-wise-view.component';

describe('PrActWiseViewComponent', () => {
  let component: PrActWiseViewComponent;
  let fixture: ComponentFixture<PrActWiseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrActWiseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrActWiseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
