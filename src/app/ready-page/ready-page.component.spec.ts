import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyPageComponent } from './ready-page.component';

describe('ReadyPageComponent', () => {
  let component: ReadyPageComponent;
  let fixture: ComponentFixture<ReadyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
