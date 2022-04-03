import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTouchComponent } from './menu-touch.component';

describe('MenuTouchComponent', () => {
  let component: MenuTouchComponent;
  let fixture: ComponentFixture<MenuTouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
