import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveButtonComponent } from './archive-button.component';

describe('ArchiveButtonComponent', () => {
  let component: ArchiveButtonComponent;
  let fixture: ComponentFixture<ArchiveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
