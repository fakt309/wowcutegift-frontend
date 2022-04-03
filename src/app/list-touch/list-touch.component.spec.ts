import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTouchComponent } from './list-touch.component';

describe('ListTouchComponent', () => {
  let component: ListTouchComponent;
  let fixture: ComponentFixture<ListTouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
