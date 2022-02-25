import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTapesComponent } from './list-of-tapes.component';

describe('ListOfTapesComponent', () => {
  let component: ListOfTapesComponent;
  let fixture: ComponentFixture<ListOfTapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTapesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
