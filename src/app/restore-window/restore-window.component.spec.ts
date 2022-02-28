import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreWindowComponent } from './restore-window.component';

describe('RestoreWindowComponent', () => {
  let component: RestoreWindowComponent;
  let fixture: ComponentFixture<RestoreWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
