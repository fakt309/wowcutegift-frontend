import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfGiftsComponent } from './list-of-gifts.component';

describe('ListOfGiftsComponent', () => {
  let component: ListOfGiftsComponent;
  let fixture: ComponentFixture<ListOfGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfGiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
