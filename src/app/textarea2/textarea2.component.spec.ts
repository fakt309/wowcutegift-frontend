import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Textarea2Component } from './textarea2.component';

describe('Textarea2Component', () => {
  let component: Textarea2Component;
  let fixture: ComponentFixture<Textarea2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Textarea2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Textarea2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
