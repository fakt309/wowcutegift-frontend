import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageListArrayComponent } from './image-list-array.component';

describe('ImageListArrayComponent', () => {
  let component: ImageListArrayComponent;
  let fixture: ComponentFixture<ImageListArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageListArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
