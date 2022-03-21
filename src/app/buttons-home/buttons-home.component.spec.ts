import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsHomeComponent } from './buttons-home.component';

describe('ButtonsHomeComponent', () => {
  let component: ButtonsHomeComponent;
  let fixture: ComponentFixture<ButtonsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
