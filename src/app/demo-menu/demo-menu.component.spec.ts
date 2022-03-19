import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMenuComponent } from './demo-menu.component';

describe('DemoMenuComponent', () => {
  let component: DemoMenuComponent;
  let fixture: ComponentFixture<DemoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
