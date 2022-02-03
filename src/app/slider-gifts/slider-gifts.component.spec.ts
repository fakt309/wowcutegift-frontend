import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderGiftsComponent } from './slider-gifts.component';

describe('SliderGiftsComponent', () => {
  let component: SliderGiftsComponent;
  let fixture: ComponentFixture<SliderGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderGiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
