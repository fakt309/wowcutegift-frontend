import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGiftComponent } from './menu-gift.component';

describe('MenuGiftComponent', () => {
  let component: MenuGiftComponent;
  let fixture: ComponentFixture<MenuGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
