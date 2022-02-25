import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfWrapsComponent } from './list-of-wraps.component';

describe('ListOfWrapsComponent', () => {
  let component: ListOfWrapsComponent;
  let fixture: ComponentFixture<ListOfWrapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfWrapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfWrapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
