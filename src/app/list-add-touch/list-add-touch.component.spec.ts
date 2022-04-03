import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddTouchComponent } from './list-add-touch.component';

describe('ListAddTouchComponent', () => {
  let component: ListAddTouchComponent;
  let fixture: ComponentFixture<ListAddTouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAddTouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
